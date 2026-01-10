import { Token, TokenStatus } from "../types/token";

// Constants for simulation
const MIN_UPDATE_INTERVAL = 500; // 0.5 seconds
const MAX_UPDATE_INTERVAL = 1200; // 1.2 seconds
const TOKENS_PER_SECTION = 20;
const PRICE_CHANGE_MIN = -0.05; // -5% max decrease
const PRICE_CHANGE_MAX = 0.05;  // +5% max increase
const UPDATE_PROBABILITY = 0.7; // 70% of tokens update per cycle

// Price update event type
export interface PriceUpdate {
  tokenId: string;
  priceUsd: number;
  priceChange24h: number;
  volume24h: number;
  timestamp: number;
}

// Subscriber callback type
export type PriceUpdateCallback = (updates: PriceUpdate[]) => void;
export type FullDataCallback = (tokens: Token[]) => void;

// Mock Data Generators
const generateRandomToken = (id: string, status: TokenStatus): Token => {
  const now = Date.now();
  const age = Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 7); // up to 7 days
  const basePrice = Math.random() * 100;
  
  return {
    id,
    name: `Token ${id.substring(0, 4).toUpperCase()}`,
    symbol: id.substring(0, 3).toUpperCase(),
    image: `https://avatar.vercel.sh/${id}`, // Deterministic placeholder
    priceUsd: basePrice,
    priceChange24h: (Math.random() * 40) - 20, // -20% to +20%
    liquidity: Math.random() * 1000000,
    marketCap: Math.random() * 10000000,
    volume24h: Math.random() * 500000,
    txns24h: Math.floor(Math.random() * 10000),
    createdAt: now - age,
    holders: Math.floor(Math.random() * 5000),
    status,
    contractAddress: `0x${Math.random().toString(16).substring(2, 42)}`,
    description: "A revolutionary token for the decentralized future."
  };
};

/**
 * MockWebSocket - Simulates a real WebSocket price streaming service
 * 
 * Features:
 * - subscribe/unsubscribe pattern
 * - Incremental price updates (1-3 second intervals)
 * - Small percentage changes per update
 * - Emits granular updates (only changed tokens)
 */
export class MockWebSocket {
  private priceSubscribers: PriceUpdateCallback[] = [];
  private fullDataSubscribers: FullDataCallback[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private tokens: Token[] = [];
  private isConnected: boolean = false;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    const statuses: TokenStatus[] = ['new', 'final', 'migrated'];
    this.tokens = statuses.flatMap(status => 
      Array.from({ length: TOKENS_PER_SECTION }).map((_, i) => 
        generateRandomToken(`${status}-${i}-${Date.now()}`, status)
      )
    ).map(token => ({
      ...token,
      marketCap: Math.random() * 5000000 + 500000, // Significant spread
    }));
  }

  /**
   * Subscribe to price updates
   * Returns an unsubscribe function
   */
  public subscribe(callback: PriceUpdateCallback): () => void {
    if (typeof callback !== 'function') {
      console.warn('subscribe: callback must be a function');
      return () => {}; // Return no-op unsubscribe
    }

    this.priceSubscribers.push(callback);
    
    if (!this.isConnected) {
      this.connect();
    }

    return () => {
      this.priceSubscribers = this.priceSubscribers.filter(sub => sub !== callback);
      if (this.priceSubscribers.length === 0 && this.fullDataSubscribers.length === 0) {
        this.disconnect();
      }
    };
  }

  /**
   * Subscribe to full token data (initial load)
   * Returns an unsubscribe function
   */
  public onMessage(callback: FullDataCallback): () => void {
    if (typeof callback !== 'function') {
      console.warn('onMessage: callback must be a function');
      return () => {}; // Return no-op unsubscribe
    }

    this.fullDataSubscribers.push(callback);
    
    // Emit initial data asynchronously to avoid issues during initialization
    try {
      callback([...this.tokens]);
    } catch (error) {
      console.error('Error in onMessage callback:', error);
    }

    if (!this.isConnected) {
      this.connect();
    }

    return () => {
      this.fullDataSubscribers = this.fullDataSubscribers.filter(sub => sub !== callback);
      if (this.priceSubscribers.length === 0 && this.fullDataSubscribers.length === 0) {
        this.disconnect();
      }
    };
  }

  private connect() {
    if (this.isConnected) return;
    this.isConnected = true;
    this.startPriceStream();
  }

  private disconnect() {
    if (!this.isConnected) return;
    this.isConnected = false;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Start the price update stream
   * Updates occur at random intervals between 1-3 seconds
   */
  private startPriceStream() {
    const scheduleNext = () => {
      const delay = Math.random() * (MAX_UPDATE_INTERVAL - MIN_UPDATE_INTERVAL) + MIN_UPDATE_INTERVAL;
      
      this.intervalId = setTimeout(() => {
        this.updatePrices();
        scheduleNext();
      }, delay) as unknown as NodeJS.Timeout;
    };

    scheduleNext();
  }

  /**
   * Update prices incrementally
   * Only updates a subset of tokens with small percentage changes
   */
  private updatePrices() {
    const updates: PriceUpdate[] = [];

    this.tokens = this.tokens.map(token => {
      // Randomly select tokens to update (40% probability)
      if (Math.random() > UPDATE_PROBABILITY) {
        return token;
      }

      // Calculate small incremental change (-1.5% to +1.5%)
      const changePercent = (Math.random() * (PRICE_CHANGE_MAX - PRICE_CHANGE_MIN)) + PRICE_CHANGE_MIN;
      const newPrice = Math.max(0.000001, token.priceUsd * (1 + changePercent));
      
      // Calculate incremental change for 24h change (smaller impact)
      const change24hAdjustment = changePercent * 0.1; // Scale down 24h impact
      
      // Increment volume slightly
      const volumeIncrement = Math.random() * 1000;

      const updatedToken = {
        ...token,
        priceUsd: newPrice,
        priceChange24h: token.priceChange24h + (change24hAdjustment * 100),
        volume24h: token.volume24h + volumeIncrement,
      };

      updates.push({
        tokenId: token.id,
        priceUsd: updatedToken.priceUsd,
        priceChange24h: updatedToken.priceChange24h,
        volume24h: updatedToken.volume24h,
        timestamp: Date.now(),
      });

      return updatedToken;
    });

    // Emit updates only if there are any
    if (updates.length > 0) {
      this.emitPriceUpdates(updates);
    }
  }

  /**
   * Emit price updates to all subscribers
   */
  private emitPriceUpdates(updates: PriceUpdate[]) {
    this.priceSubscribers.forEach(callback => {
      try {
        if (typeof callback === 'function') {
          callback(updates);
        }
      } catch (error) {
        console.error('Error in price update callback:', error);
      }
    });
  }

  /**
   * Legacy connect method for backward compatibility
   * @deprecated Use subscribe() and onMessage() instead
   */
  public connect(callback: FullDataCallback) {
    const unsubscribe = this.onMessage(callback);
    return unsubscribe;
  }
}

export const socketService = new MockWebSocket();

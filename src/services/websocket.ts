import { Token, TokenStatus } from "../types/token";

// Constants for simulation
const UPDATE_INTERVAL = 1000; // 1s
const TOKENS_PER_SECTION = 20;

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

export class MockWebSocket {
  private subscribers: ((data: Token[]) => void)[] = [];
  private intervalId: NodeJS.Timeout | null = null;
  private tokens: Token[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    const statuses: TokenStatus[] = ['new', 'final', 'migrated'];
    this.tokens = statuses.flatMap(status => 
      Array.from({ length: TOKENS_PER_SECTION }).map((_, i) => 
        generateRandomToken(`${status}-${i}-${Date.now()}`, status)
      )
    );
  }

  public connect(onMessage: (data: Token[]) => void) {
    this.subscribers.push(onMessage);
    
    // Initial emission
    onMessage(this.tokens);

    if (!this.intervalId) {
      this.startEmitting();
    }

    return () => this.disconnect(onMessage);
  }

  private disconnect(onMessage: (data: Token[]) => void) {
    this.subscribers = this.subscribers.filter(sub => sub !== onMessage);
    if (this.subscribers.length === 0 && this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private startEmitting() {
    this.intervalId = setInterval(() => {
      this.updatePrices();
      this.emit();
    }, UPDATE_INTERVAL);
  }

  private updatePrices() {
    // Update a subset of tokens to simulate activity
    this.tokens = this.tokens.map(token => {
      if (Math.random() > 0.7) return token; // 70% chance no change

      const change = (Math.random() * 0.04) - 0.02; // -2% to +2% change
      const newPrice = Math.max(0.000001, token.priceUsd * (1 + change));
      
      return {
        ...token,
        priceUsd: newPrice,
        priceChange24h: token.priceChange24h + (change * 100), // Approximate update
        volume24h: token.volume24h + (Math.random() * 1000)
      };
    });
  }

  private emit() {
    this.subscribers.forEach(sub => sub(this.tokens));
  }
}

export const socketService = new MockWebSocket();

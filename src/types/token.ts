export type TokenStatus = 'new' | 'final' | 'migrated';

export interface Token {
  id: string;
  name: string;
  symbol: string;
  image: string; // URL to placeholder
  priceUsd: number;
  priceChange24h: number; // Percentage
  liquidity: number;
  marketCap: number;
  volume24h: number;
  txns24h: number;
  createdAt: number; // Timestamp
  holders: number;
  status: TokenStatus;
  
  // For detail view
  description?: string;
  contractAddress?: string;
}

export type SortKey = keyof Pick<Token, 'priceUsd' | 'priceChange24h' | 'liquidity' | 'marketCap' | 'volume24h' | 'txns24h' | 'createdAt'>;
export type SortDirection = 'asc' | 'desc';

export interface TableState {
  section: TokenStatus;
  sortBy: SortKey;
  sortDirection: SortDirection;
}

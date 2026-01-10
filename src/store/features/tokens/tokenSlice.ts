import { createSlice, createEntityAdapter, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Token, TokenStatus, SortKey, SortDirection } from '@/types/token';
import { socketService } from '@/services/websocket';
import { RootState } from '@/store/store';

// Entity Adapter for normalized state
const tokensAdapter = createEntityAdapter<Token>({
  sortComparer: (a, b) => b.marketCap - a.marketCap, // Default sort
});

export interface TokenState {
  status: 'idle' | 'loading' | 'connected' | 'failed';
  activeSection: TokenStatus;
  sortBy: SortKey;
  sortDirection: SortDirection;
}

const initialState = tokensAdapter.getInitialState<TokenState>({
  status: 'idle',
  activeSection: 'new', // Default view
  sortBy: 'createdAt',
  sortDirection: 'desc',
});

// Thunk to initialize socket connection
export const connectSocket = createAsyncThunk(
  'tokens/connectSocket',
  async (_, { dispatch }) => {
    const unsubscribe = socketService.connect((tokens) => {
      dispatch(tokensReceived(tokens));
    });
    return unsubscribe; // We can't store functions in Redux, but the thunk lifecycle handles this differently usually. 
    // Actually, we shouldn't return the unsubscribe here to be stored in state.
    // We'll handle cleanup in a useEffect in the component.
  }
);

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    tokensReceived(state, action: PayloadAction<Token[]>) {
      tokensAdapter.upsertMany(state, action.payload);
      state.status = 'connected';
    },
    priceUpdatesReceived(state, action: PayloadAction<Array<{ tokenId: string; priceUsd: number; priceChange24h: number; volume24h: number }>>) {
      action.payload.forEach((update) => {
        const existingToken = state.entities[update.tokenId];
        if (existingToken) {
          // Ensure we don't divide by zero and handle price updates
          const oldPrice = existingToken.priceUsd || 0.000001;
          const priceRatio = update.priceUsd / oldPrice;
          
          // Calculate new market cap based on price change
          const newMarketCap = existingToken.marketCap * priceRatio;
          
          tokensAdapter.updateOne(state, {
            id: update.tokenId,
            changes: {
              priceUsd: update.priceUsd,
              priceChange24h: update.priceChange24h,
              volume24h: update.volume24h,
              marketCap: newMarketCap,
            },
          });
        }
      });
    },
    setSection(state, action: PayloadAction<TokenStatus>) {
      state.activeSection = action.payload;
    },
    setSorting(state, action: PayloadAction<{ key: SortKey; direction: SortDirection }>) {
      state.sortBy = action.payload.key;
      state.sortDirection = action.payload.direction;
    }
  },
});

export const { tokensReceived, priceUpdatesReceived, setSection, setSorting } = tokenSlice.actions;

// Selectors
export const {
  selectAll: selectAllTokens,
  selectById: selectTokenById,
} = tokensAdapter.getSelectors((state: RootState) => state.tokens);

export const selectActiveTokens = (state: RootState) => {
  const allTokens = selectAllTokens(state);
  const { activeSection, sortBy, sortDirection } = state.tokens;
  
  const filtered = allTokens.filter(t => t.status === activeSection);
  
  // Default to marketCap sorting if not explicitly set, or allow dynamic sorting
  return filtered.sort((a, b) => {
    const aValue = a[sortBy] as number;
    const bValue = b[sortBy] as number;
    
    // If we're sorting by createdAt (default), we might want to still consider marketCap for movement
    // but here we follow the set sorting or fallback to marketCap
    if (sortBy === 'createdAt') {
       return b.marketCap - a.marketCap;
    }

    if (sortDirection === 'asc') {
      return aValue - bValue;
    }
    return bValue - aValue;
  });
};

export const selectTokensByStatus = (status: TokenStatus) => (state: RootState) => {
  const allTokens = selectAllTokens(state);
  // Sort by marketCap descending so tokens move up/down as prices change
  return allTokens.filter(t => t.status === status).sort((a, b) => b.marketCap - a.marketCap);
};

export const selectTokenState = (state: RootState) => state.tokens;

export default tokenSlice.reducer;

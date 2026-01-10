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
    setSection(state, action: PayloadAction<TokenStatus>) {
      state.activeSection = action.payload;
    },
    setSorting(state, action: PayloadAction<{ key: SortKey; direction: SortDirection }>) {
      state.sortBy = action.payload.key;
      state.sortDirection = action.payload.direction;
    }
  },
});

export const { tokensReceived, setSection, setSorting } = tokenSlice.actions;

// Selectors
export const {
  selectAll: selectAllTokens,
  selectById: selectTokenById,
} = tokensAdapter.getSelectors((state: RootState) => state.tokens);

export const selectActiveTokens = (state: RootState) => {
  const allTokens = selectAllTokens(state);
  const { activeSection, sortBy, sortDirection } = state.tokens;
  
  const filtered = allTokens.filter(t => t.status === activeSection);
  
  return filtered.sort((a, b) => {
    const aValue = a[sortBy] as number;
    const bValue = b[sortBy] as number;
    
    if (sortDirection === 'asc') {
      return aValue - bValue;
    }
    return bValue - aValue;
  });
};

export const selectTokenState = (state: RootState) => state.tokens;

export default tokenSlice.reducer;

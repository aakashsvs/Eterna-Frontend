import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { tokensReceived, priceUpdatesReceived } from '@/store/features/tokens/tokenSlice';
import { useMockWebSocket } from './use-mock-websocket';
import { Token, PriceUpdate } from '@/services/websocket';

/**
 * Hook to establish WebSocket connection and handle data updates
 * 
 * Architecture:
 * - Data stream simulation (useMockWebSocket)
 * - State updates (Redux dispatch)
 * - Presentation (components subscribe to Redux state)
 */
export const useSocketConnection = () => {
  const dispatch = useAppDispatch();

  // Handle initial full token data
  const handleFullData = (tokens: Token[]) => {
    dispatch(tokensReceived(tokens));
  };

  // Handle incremental price updates
  const handlePriceUpdates = (updates: PriceUpdate[]) => {
    // Only dispatch price-related updates - no layout shifts
    // Convert PriceUpdate to the format expected by Redux action
    const priceUpdatePayload = updates.map(({ tokenId, priceUsd, priceChange24h, volume24h }) => ({
      tokenId,
      priceUsd,
      priceChange24h,
      volume24h,
    }));
    dispatch(priceUpdatesReceived(priceUpdatePayload));
  };

  // Connect to mock WebSocket service
  useMockWebSocket(handlePriceUpdates, handleFullData);
};

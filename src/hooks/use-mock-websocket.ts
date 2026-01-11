import { useEffect, useRef } from 'react';
import { socketService, PriceUpdateCallback, FullDataCallback } from '@/services/websocket';

/**
 * Hook to connect to mock WebSocket service
 * Handles subscription lifecycle and cleanup
 */
export function useMockWebSocket(
  onPriceUpdate: PriceUpdateCallback,
  onFullData?: FullDataCallback
) {
  const priceUpdateRef = useRef(onPriceUpdate);
  const fullDataRef = useRef(onFullData);

  // Keep refs up to date
  useEffect(() => {
    priceUpdateRef.current = onPriceUpdate;
    fullDataRef.current = onFullData;
  }, [onPriceUpdate, onFullData]);

  useEffect(() => {
    // Subscribe to price updates
    const unsubscribePrice = socketService.subscribe((updates) => {
      if (priceUpdateRef.current) {
        priceUpdateRef.current(updates);
      }
    });

    // Subscribe to full data if callback provided
    let unsubscribeFull: (() => void) | undefined;
    if (fullDataRef.current) {
      unsubscribeFull = socketService.onMessage((tokens) => {
        if (fullDataRef.current) {
          fullDataRef.current(tokens);
        }
      });
    }

    // Cleanup
    return () => {
      unsubscribePrice();
      unsubscribeFull?.();
    };
  }, []); // Only run once on mount - dependencies are handled via refs
}


import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { tokensReceived } from '@/store/features/tokens/tokenSlice';
import { socketService } from '@/services/websocket';

export const useSocketConnection = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = socketService.connect((tokens) => {
      dispatch(tokensReceived(tokens));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);
};

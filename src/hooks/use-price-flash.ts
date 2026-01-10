import { useEffect, useRef, useState } from 'react';

export function usePriceFlash(price: number) {
  const [flash, setFlash] = useState<'up' | 'down' | null>(null);
  const prevPrice = useRef(price);

  useEffect(() => {
    if (price > prevPrice.current) {
      setFlash('up');
    } else if (price < prevPrice.current) {
      setFlash('down');
    }

    prevPrice.current = price;

    const timeout = setTimeout(() => {
      setFlash(null);
    }, 1000); // Flash duration

    return () => clearTimeout(timeout);
  }, [price]);

  return flash;
}

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface PriceCellProps {
  price: number;
  className?: string;
}

export const PriceCell: React.FC<PriceCellProps> = React.memo(({ price, className }) => {
  const prevPrice = useRef(price);
  const [direction, setDirection] = useState<'up' | 'down' | 'neutral'>('neutral');

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(val);

  useEffect(() => {
    if (price > prevPrice.current) {
      setDirection('up');
    } else if (price < prevPrice.current) {
      setDirection('down');
    } else {
        return;
    }

    prevPrice.current = price;

    const timeout = setTimeout(() => {
      setDirection('neutral');
    }, 500); // 500ms flash duration

    return () => clearTimeout(timeout);
  }, [price]);

  return (
    <motion.div
      className={cn(
        "px-1 rounded transition-colors duration-300",
        className
      )}
      animate={{
        backgroundColor: direction === 'up' 
          ? 'rgba(34, 197, 94, 0.2)' // green-500/20
          : direction === 'down' 
            ? 'rgba(239, 68, 68, 0.2)' // red-500/20
            : 'rgba(0, 0, 0, 0)',
        color: direction === 'up'
            ? '#4ade80' // green-400
            : direction === 'down'
            ? '#f87171' // red-400
            : '#FCFCFC' // default white
      }}
      transition={{ duration: 0.3 }}
    >
      F {formatCurrency(price)}
    </motion.div>
  );
});

PriceCell.displayName = 'PriceCell';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface PriceCellProps {
  price: number;
  className?: string;
  compact?: boolean;
}

export const PriceCell: React.FC<PriceCellProps> = React.memo(({ price, className, compact }) => {
  const prevPrice = useRef(price);
  const [direction, setDirection] = useState<'up' | 'down' | 'neutral'>('neutral');

  const formatCurrency = (val: number) => {
    if (compact) {
      return '$' + new Intl.NumberFormat('en-US', { 
        notation: 'compact', 
        maximumFractionDigits: 1 
      }).format(val);
    }
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD', 
      maximumSignificantDigits: 3 
    }).format(val);
  };

  useEffect(() => {
    // Only trigger animation if price actually changed
    if (Math.abs(price - prevPrice.current) < 0.000001) {
      return; // Price unchanged
    }

    if (price > prevPrice.current) {
      setDirection('up');
    } else if (price < prevPrice.current) {
      setDirection('down');
    }

    prevPrice.current = price;

    // Flash duration: 400ms (within 300-500ms requirement)
    const timeout = setTimeout(() => {
      setDirection('neutral');
    }, 400);

    return () => clearTimeout(timeout);
  }, [price]);

  return (
    <motion.div
      className={cn(
        "px-1 rounded inline-block",
        className
      )}
      animate={{
        backgroundColor: direction === 'up' 
          ? 'rgba(34, 197, 94, 0.25)' // green-500/25 (slightly more visible)
          : direction === 'down' 
            ? 'rgba(239, 68, 68, 0.25)' // red-500/25
            : 'transparent',
        color: direction === 'up'
            ? '#22c55e' // green-500 (stronger)
            : direction === 'down'
            ? '#ef4444' // red-500 (stronger)
            : undefined // Use default color from className
      }}
      transition={{ 
        duration: 0.4, // 400ms animation
        ease: "easeOut"
      }}
      style={{
        // Ensure no layout shifts
        minWidth: 'fit-content',
      }}
    >
      {formatCurrency(price)}
    </motion.div>
  );
});

PriceCell.displayName = 'PriceCell';

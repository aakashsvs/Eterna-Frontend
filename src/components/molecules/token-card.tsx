import React, { useMemo } from 'react';
import { Token } from '@/types/token';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Search, User, Lock, Eye, Link2 } from 'lucide-react';
import Image from 'next/image';

interface TokenCardProps {
  token: Token;
  onClick: (token: Token) => void;
}

export const TokenCard: React.FC<TokenCardProps> = React.memo(({ token, onClick }) => {
  const formatCompact = (val: number) => 
    new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(val);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 3 }).format(val);

  const formatAge = (timestamp: number) => {
    const distance = formatDistanceToNow(timestamp, { addSuffix: false });
    // Convert to compact format: "13s", "1h", "2m", etc.
    if (distance.includes('second')) {
      return `${distance.split(' ')[0]}s`;
    } else if (distance.includes('minute')) {
      return `${distance.split(' ')[0]}m`;
    } else if (distance.includes('hour')) {
      return `${distance.split(' ')[0]}h`;
    } else if (distance.includes('day')) {
      return `${distance.split(' ')[0]}d`;
    }
    return distance;
  };

  // Generate percentage values for the bars (mocked for now - you can derive from actual data)
  // Using token ID as seed for consistent values per token
  const percentages = useMemo(() => {
    const seed = token.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = (index: number) => {
      const x = Math.sin(seed + index) * 10000;
      return (x - Math.floor(x)) * 30;
    };
    return [
      Math.abs(token.priceChange24h) > 25 ? 25 : Math.abs(token.priceChange24h),
      random(1),
      random(2),
      random(3),
      random(4),
    ].map(p => Math.min(30, Math.max(0, p))); // Clamp between 0-30%
  }, [token.id, token.priceChange24h]);

  return (
    <div
      className="group bg-card border border-border rounded-lg p-3 mb-3 hover:border-purple-500/30 hover:bg-card/80 transition-all cursor-pointer"
      onClick={() => onClick(token)}
    >
      {/* Token Header */}
      <div className="flex items-start gap-2 mb-2">
        {/* Token Image */}
        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-muted border border-border/50">
          <Image src={token.image} alt={token.name} fill className="object-cover" sizes="48px" />
        </div>

        {/* Token Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-sm truncate">{token.name}</h3>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{formatAge(token.createdAt)}</span>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1 mb-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (token.contractAddress) {
                  navigator.clipboard.writeText(token.contractAddress);
                }
              }}
              className="p-1 hover:bg-muted/50 rounded transition-colors"
            >
              <Link2 size={12} className="text-muted-foreground" />
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1 hover:bg-muted/50 rounded transition-colors"
            >
              <Search size={12} className="text-muted-foreground" />
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1 hover:bg-muted/50 rounded transition-colors"
            >
              <User size={12} className="text-muted-foreground" />
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1 hover:bg-muted/50 rounded transition-colors"
            >
              <Lock size={12} className="text-muted-foreground" />
            </button>
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1 hover:bg-muted/50 rounded transition-colors"
            >
              <Eye size={12} className="text-muted-foreground" />
            </button>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs mb-2">
            <div>
              <span className="text-muted-foreground">MC </span>
              <span className="text-foreground font-medium">${formatCompact(token.marketCap)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">V </span>
              <span className="text-foreground font-medium">${formatCompact(token.volume24h)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">F </span>
              <span className="text-foreground font-medium">{formatCurrency(token.priceUsd)}</span>
            </div>
            <div>
              <span className="text-muted-foreground">TX </span>
              <span className="text-foreground font-medium">{token.txns24h}</span>
            </div>
          </div>

          {/* Creator/Handle (mock data) */}
          {Math.random() > 0.5 && (
            <div className="text-xs text-muted-foreground mb-2">
              @{token.symbol.toLowerCase()} {formatCompact(token.holders)}
            </div>
          )}
        </div>
      </div>

      {/* Percentage Bars */}
      <div className="flex items-center gap-1 mt-2 pt-2 border-t border-border/50">
        {percentages.map((percentage, index) => (
          <div key={index} className="flex-1 flex items-center justify-center">
            <div className="relative w-full h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "absolute left-0 top-0 h-full rounded-full transition-all",
                  percentage > 20 ? "bg-purple-500" : percentage > 10 ? "bg-green-500" : "bg-muted-foreground/30"
                )}
                style={{ width: `${Math.min(100, (percentage / 30) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] text-muted-foreground ml-1 w-6 text-left">
              {percentage > 20 && index === 0 ? 'DS' : `${Math.round(percentage)}%`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});

TokenCard.displayName = 'TokenCard';


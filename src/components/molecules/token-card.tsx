import React from 'react';
import { Token } from '@/types/token';
import { formatDistanceToNow } from 'date-fns';
import { Copy } from 'lucide-react';
import Image from 'next/image';
import { PumpIcon } from '../icons/pump-icon';

interface TokenCardProps {
  token: Token;
  onClick: (token: Token) => void;
}

export const TokenCard: React.FC<TokenCardProps> = React.memo(({ token, onClick }) => {
  const formatCompact = (val: number) => 
    new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(val);

  const formatAge = (timestamp: number) => {
    const distance = formatDistanceToNow(timestamp, { addSuffix: false });
    if (distance.includes('second')) return `${distance.split(' ')[0]}s`;
    if (distance.includes('minute')) return `${distance.split(' ')[0]}m`;
    if (distance.includes('hour')) return `${distance.split(' ')[0]}h`;
    if (distance.includes('day')) return `${distance.split(' ')[0]}d`;
    return distance;
  };

  const isKoth = token.marketCap > 30000; // Mock KOTH threshold

  return (
    <div
      className="group bg-card/40 border border-border/50 rounded-[4px] p-2 mb-2 hover:bg-card/80 hover:border-primary/20 transition-all cursor-pointer relative overflow-hidden"
      onClick={() => onClick(token)}
    >
      <div className="flex flex-row gap-3 items-start">
        {/* Token Image */}
        <div className="relative w-10 h-10 rounded-[4px] overflow-hidden flex-shrink-0 bg-muted">
          <Image src={token.image} alt={token.name} fill className="object-cover" sizes="40px" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              {isKoth && (
                <span className="text-[10px] font-bold bg-[#1e293b] text-primary px-1 rounded-[2px] border border-primary/20">
                  KOTH
                </span>
              )}
              <span className="font-bold text-sm text-foreground truncate">{token.symbol}</span>
              <PumpIcon className="w-3 h-3 text-muted-foreground" />
            </div>
            <span className="text-xs font-medium text-[#18b580]">{formatAge(token.createdAt)}</span>
          </div>

          {/* Sub Header / Name */}
          <div className="flex items-center justify-between">
             <span className="text-xs text-muted-foreground truncate max-w-[120px]" title={token.name}>
               {token.name}
             </span>
             <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-0.5 hover:text-primary transition-colors text-muted-foreground">
                  <Copy size={12} />
                </button>
             </div>
          </div>

          {/* Metrics Row */}
          <div className="flex items-center gap-3 mt-1 text-[11px] font-medium">
             <div className="flex items-center gap-1 text-muted-foreground">
               <span>MC:</span>
               <span className="text-foreground">${formatCompact(token.marketCap)}</span>
             </div>
             <div className="flex items-center gap-1 text-muted-foreground">
               <span>Vol:</span>
               <span className="text-foreground">${formatCompact(token.volume24h)}</span>
             </div>
          </div>
        </div>
      </div>

      {/* Progress Bar (Visual Flair) */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-muted/20">
        <div 
          className="h-full bg-gradient-to-r from-primary/50 to-primary" 
          style={{ width: `${Math.min(100, (token.marketCap / 50000) * 100)}%` }}
        />
      </div>
    </div>
  );
});

TokenCard.displayName = 'TokenCard';


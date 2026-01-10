import React from 'react';
import { Token } from '@/types/token';
import { formatDistanceToNow } from 'date-fns';
import { Copy, Link2, Search, User, Lock, Leaf } from 'lucide-react';
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
    return distance;
  };

  // Mock percentage badges (0%, 24%, etc.)
  const badges = [
    { label: '25%', color: 'text-red-500', icon: 'User' },
    { label: 'DS', color: 'text-blue-400', icon: 'Shield' }, // Dev Sold?
    { label: '0%', color: 'text-green-500', icon: 'Lock' },
    { label: '6%', color: 'text-green-500', icon: 'Eye' },
    { label: '8%', color: 'text-green-500', icon: 'Globe' },
  ];

  return (
    <div
      className="group bg-[#06070B] border-b border-border/50 p-3 hover:bg-[#1e293b]/30 transition-colors cursor-pointer relative"
      onClick={() => onClick(token)}
    >
      <div className="flex gap-3">
        {/* Large Image */}
        <div className="relative w-[72px] h-[72px] rounded-[4px] overflow-hidden bg-muted border border-border/30 flex-shrink-0">
          <Image src={token.image} alt={token.name} fill className="object-cover" />
        </div>

        {/* Content Column */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          
          {/* Row 1: Ticker | Name | MC */}
          <div className="flex items-start justify-between leading-none">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="text-[16px] font-bold text-[#FCFCFC] truncate">{token.symbol}</span>
              <span className="text-[13px] font-medium text-muted-foreground truncate">{token.name}</span>
              <Copy size={12} className="text-muted-foreground hover:text-foreground cursor-pointer" />
            </div>
            <div className="flex items-center gap-1 text-[13px]">
              <span className="text-muted-foreground">MC</span>
              <span className="font-bold text-primaryBlue">${formatCompact(token.marketCap)}</span>
            </div>
          </div>

          {/* Row 2: Time | Icons | Volume */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-bold text-[#18F195]">{formatAge(token.createdAt)}</span>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Leaf size={12} className="text-[#18F195]" />
                <Link2 size={12} />
                <Search size={12} />
                <User size={12} />
                <Lock size={12} />
              </div>
            </div>
            <div className="flex items-center gap-1 text-[12px]">
              <span className="text-muted-foreground">V</span>
              <span className="font-bold text-[#FCFCFC]">${formatCompact(token.volume24h)}</span>
            </div>
          </div>

          {/* Row 3: Creator | Fees/Txns */}
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-1 text-[12px]">
              <span className="text-muted-foreground">by</span>
              <span className="text-primaryBlue hover:underline cursor-pointer">@unknown</span>
              <User size={10} className="text-primaryBlue" />
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <span className="text-muted-foreground">F <span className="text-[#FCFCFC]">0.0<sub className="bottom-0">2</sub>3</span></span>
              <span className="text-muted-foreground">TX <span className="text-[#FCFCFC]">{token.txns24h}</span></span>
            </div>
          </div>

          {/* Row 4: Badges */}
          <div className="flex items-center gap-2 mt-2">
            {badges.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-1 bg-[#1e293b]/50 px-1.5 py-0.5 rounded-[4px] border border-border/30">
                {badge.label === 'DS' ? (
                  <PumpIcon className="w-3 h-3 text-blue-400" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full" />
                )}
                <span className="text-[10px] font-bold">{badge.label}</span>
              </div>
            ))}
            <div className="ml-auto">
               <PumpIcon className="w-4 h-4 text-muted-foreground opacity-50" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});

TokenCard.displayName = 'TokenCard';


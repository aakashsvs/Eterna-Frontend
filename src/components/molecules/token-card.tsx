import React from 'react';
import { Token } from '@/types/token';
import { formatDistanceToNow } from 'date-fns';
import { Copy, Link2, Search, User, Lock, Star, ChefHat, Crosshair, Ghost, Boxes } from 'lucide-react';
import Image from 'next/image';
import { PumpIcon } from '../icons/pump-icon';

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
    if (distance.includes('second')) return `${distance.split(' ')[0]}s`;
    if (distance.includes('minute')) return `${distance.split(' ')[0]}m`;
    if (distance.includes('hour')) return `${distance.split(' ')[0]}h`;
    return distance;
  };

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
              <span className="text-muted-foreground">F <span className="text-[#FCFCFC]">{formatCurrency(token.priceUsd)}</span></span>
              <span className="text-muted-foreground">TX <span className="text-[#FCFCFC]">{token.txns24h}</span></span>
            </div>
          </div>

          {/* Row 4: New Badge Elements from Provided HTML */}
          <div className="flex flex-row w-full h-[24px] gap-[4px] justify-start items-end mt-2 overflow-x-auto hide-scrollbar">
            <div>
              <div className="flex flex-row gap-[4px] flex-shrink-0 h-[24px] px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border-[1px]">
                <Star size={14} className="text-primaryRed" />
                <span className="text-primaryRed text-[12px] font-medium">32%</span>
              </div>
            </div>
            <span className="contents">
              <div className="flex flex-row gap-[4px] flex-shrink-0 w-fit h-[24px] px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border-[1px]">
                <div className="w-[16px] h-[16px] flex items-center justify-center">
                  <ChefHat size={12} className="text-primaryGreen" />
                </div>
                <span className="text-primaryGreen text-[12px] font-medium">4%</span>
              </div>
            </span>
            <span className="contents">
              <div className="flex flex-row gap-[4px] flex-shrink-0 w-fit h-[24px] px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border-[1px]">
                <Crosshair size={14} className="text-primaryRed" />
                <span className="text-primaryRed text-[12px] font-medium">5%</span>
              </div>
            </span>
            <span className="contents">
              <div className="flex flex-row gap-[4px] flex-shrink-0 w-fit h-[24px] px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border-[1px]">
                <Ghost size={14} className="text-primaryRed" />
                <span className="text-primaryRed text-[12px] font-medium">7%</span>
              </div>
            </span>
            <span className="contents">
              <div className="flex flex-row gap-[4px] flex-shrink-0 w-fit h-[24px] px-[5px] justify-start items-center rounded-full bg-backgroundSecondary border-primaryStroke/50 border-[1px]">
                <div className="flex justify-center items-center min-w-[14px] min-h-[14px] max-w-[14px] max-h-[14px]">
                  <Boxes size={12} className="text-primaryRed" />
                </div>
                <span className="text-primaryRed text-[12px] font-medium">25%</span>
              </div>
            </span>
            <div className="ml-auto flex-shrink-0">
               <PumpIcon className="w-4 h-4 text-muted-foreground opacity-50" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
});

TokenCard.displayName = 'TokenCard';
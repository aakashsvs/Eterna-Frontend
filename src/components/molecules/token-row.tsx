import React from 'react';
import { Token } from '@/types/token';
import { usePriceFlash } from '@/hooks/use-price-flash';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '../atoms/button';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '../atoms/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '../atoms/popover';
import { ExternalLink, MoreHorizontal, TrendingUp, TrendingDown, Copy } from 'lucide-react';
import Image from 'next/image';

interface TokenRowProps {
  token: Token;
  onClick: (token: Token) => void;
  style?: React.CSSProperties; // For virtualization
}

export const TokenRow: React.FC<TokenRowProps> = React.memo(({ token, onClick, style }) => {
  const flash = usePriceFlash(token.priceUsd);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumSignificantDigits: 6 }).format(val);

  const formatCompact = (val: number) => 
    new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(val);

  return (
    <div 
      className="group grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_50px] gap-4 p-3 border-b border-border/50 hover:bg-muted/50 transition-colors items-center text-sm cursor-pointer"
      style={style}
      onClick={() => onClick(token)}
    >
      {/* 1. Token Info */}
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-muted">
          <Image src={token.image} alt={token.name} fill className="object-cover" sizes="32px" />
        </div>
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground truncate">{token.symbol}</span>
            <span className="text-muted-foreground text-xs truncate hidden sm:inline">{token.name}</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-xs text-muted-foreground truncate hover:text-primary transition-colors cursor-help w-max">
                   {token.id.substring(0, 8)}...
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Contract Address: {token.contractAddress}</p>
                <p className="text-xs text-muted-foreground mt-1">Click to copy</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* 2. Price */}
      <div className={cn(
        "font-mono font-medium transition-colors duration-300",
        flash === 'up' ? "text-trade-up" : flash === 'down' ? "text-trade-down" : "text-foreground"
      )}>
        {formatCurrency(token.priceUsd)}
      </div>

      {/* 3. Age */}
      <div className="text-muted-foreground text-xs">
        {formatDistanceToNow(token.createdAt, { addSuffix: true }).replace("about ", "")}
      </div>

      {/* 4. Liquidity / Mkt Cap */}
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">Liq: <span className="text-foreground">{formatCompact(token.liquidity)}</span></span>
        <span className="text-xs text-muted-foreground">MC: <span className="text-foreground">{formatCompact(token.marketCap)}</span></span>
      </div>

       {/* 5. Volume / Txns */}
       <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">Vol: <span className="text-foreground">{formatCompact(token.volume24h)}</span></span>
        <span className="text-xs text-muted-foreground">Txns: <span className="text-foreground">{token.txns24h}</span></span>
      </div>

      {/* 6. Change */}
      <div className={cn(
        "flex items-center gap-1 font-medium",
        token.priceChange24h >= 0 ? "text-trade-up" : "text-trade-down"
      )}>
        {token.priceChange24h >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {Math.abs(token.priceChange24h).toFixed(2)}%
      </div>

      {/* 7. Actions */}
      <div onClick={(e) => e.stopPropagation()}>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-40 p-0">
             <div className="flex flex-col">
                <Button variant="ghost" className="justify-start gap-2 h-9 rounded-none text-xs">
                  <ExternalLink size={14} /> View Explorer
                </Button>
                <Button variant="ghost" className="justify-start gap-2 h-9 rounded-none text-xs">
                  <Copy size={14} /> Copy Address
                </Button>
             </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
});

TokenRow.displayName = 'TokenRow';

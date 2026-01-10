import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../atoms/dialog';
import { Token } from '@/types/token';
import { Badge } from '../atoms/badge';
import { Button } from '../atoms/button';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

interface TokenDetailModalProps {
  token: Token | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TokenDetailModal: React.FC<TokenDetailModalProps> = ({ token, isOpen, onClose }) => {
  if (!token) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] border-border bg-card">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted">
              <Image src={token.image} alt={token.name} fill className="object-cover" />
            </div>
            <div>
              <DialogTitle className="text-2xl flex items-center gap-2">
                {token.name} <span className="text-muted-foreground text-lg">({token.symbol})</span>
              </DialogTitle>
              <div className="flex gap-2 mt-2">
                <Badge variant={token.status === 'new' ? 'success' : 'secondary'}>
                  {token.status.toUpperCase()}
                </Badge>
                <Badge variant="outline" className="font-mono text-xs">
                  {token.id}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <div className="grid grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Price (USD)</h4>
              <p className="text-2xl font-mono font-bold">${token.priceUsd.toFixed(6)}</p>
              <p className={token.priceChange24h >= 0 ? "text-trade-up text-sm" : "text-trade-down text-sm"}>
                {token.priceChange24h >= 0 ? '+' : ''}{token.priceChange24h.toFixed(2)}% (24h)
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Liquidity</h4>
              <p className="text-lg font-mono">${token.liquidity.toLocaleString()}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Market Cap</h4>
              <p className="text-lg font-mono">${token.marketCap.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
               <h4 className="text-sm font-medium text-muted-foreground">Created</h4>
               <p className="text-lg">{formatDistanceToNow(token.createdAt, { addSuffix: true })}</p>
            </div>
            <div>
               <h4 className="text-sm font-medium text-muted-foreground">Holders</h4>
               <p className="text-lg font-mono">{token.holders.toLocaleString()}</p>
            </div>
             <div>
               <h4 className="text-sm font-medium text-muted-foreground">Volume (24h)</h4>
               <p className="text-lg font-mono">${token.volume24h.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 p-4 rounded-md mt-4">
          <h4 className="text-sm font-semibold mb-2">Description</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {token.description}
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button className="bg-trade-up text-white hover:bg-trade-up/90">Trade Now</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

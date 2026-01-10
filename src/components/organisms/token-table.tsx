"use client"

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  selectActiveTokens, 
  selectTokenState, 
  setSection, 
  setSorting 
} from '@/store/features/tokens/tokenSlice';
import { Token } from '@/types/token';
import { TokenRow } from '../molecules/token-row';
import { TokenDetailModal } from '../molecules/token-detail-modal';
import { FilterTabs } from '../molecules/filter-tabs';
import { TableHeader } from '../molecules/table-header';
import { Skeleton } from '../atoms/skeleton';
import { AlertTriangle } from 'lucide-react';
import { useSocketConnection } from '@/hooks/use-socket-connection';

export const TokenTable = () => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectActiveTokens);
  const { status, activeSection, sortBy, sortDirection } = useAppSelector(selectTokenState);
  
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  // Custom hook handles socket connection and cleanup
  useSocketConnection();

  const handleTokenClick = (token: Token) => {
    setSelectedToken(token);
  };

  const LoadingSkeleton = () => (
    <div className="space-y-2 p-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
      <AlertTriangle className="h-12 w-12 mb-4 opacity-20" />
      <p>No tokens found in this section.</p>
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full bg-card rounded-xl border border-border overflow-hidden shadow-2xl">
      {/* Controls */}
      <div className="p-4 border-b border-border flex items-center justify-between bg-card/50 backdrop-blur-sm sticky top-0 z-20">
        <h2 className="text-xl font-bold tracking-tight">Token Discovery</h2>
        <FilterTabs 
          activeTab={activeSection} 
          onTabChange={(tab) => dispatch(setSection(tab))} 
        />
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-auto min-h-[600px] relative">
        <TableHeader 
          sortBy={sortBy} 
          sortDirection={sortDirection} 
          onSort={(key) => dispatch(setSorting({ 
            key, 
            direction: sortBy === key && sortDirection === 'desc' ? 'asc' : 'desc' 
          }))} 
        />
        
        {status === 'idle' || (status === 'connected' && tokens.length === 0) ? (
          status === 'idle' ? <LoadingSkeleton /> : <EmptyState />
        ) : (
          <div className="divide-y divide-border/50">
            {tokens.map((token) => (
              <TokenRow 
                key={token.id} 
                token={token} 
                onClick={handleTokenClick} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <TokenDetailModal 
        token={selectedToken} 
        isOpen={!!selectedToken} 
        onClose={() => setSelectedToken(null)} 
      />
    </div>
  );
};

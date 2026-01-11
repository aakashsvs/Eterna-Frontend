"use client"

import React, { useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import {
  selectTokensByStatus,
  selectTokenState
} from '@/store/features/tokens/tokenSlice';
import { Token, TokenStatus } from '@/types/token';
import { TokenCard } from '../molecules/token-card';
import { TokenDetailModal } from '../molecules/token-detail-modal';
import { ColumnHeader } from '../molecules/column-header';
import { FilterModal } from './filter-modal';
import { Skeleton } from '../atoms/skeleton';
import { AlertTriangle } from 'lucide-react';
import { useSocketConnection } from '@/hooks/use-socket-connection';
import { AnimatePresence, LayoutGroup } from 'framer-motion';

export const TokenTable = () => {
  const { status, selectedChain } = useAppSelector(selectTokenState);

  // Get tokens for each column
  const newTokens = useAppSelector(selectTokensByStatus('new'));
  const finalTokens = useAppSelector(selectTokensByStatus('final'));
  const migratedTokens = useAppSelector(selectTokensByStatus('migrated'));

  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [filterModalStatus, setFilterModalStatus] = useState<TokenStatus | null>(null);

  // Custom hook handles socket connection and cleanup
  useSocketConnection();

  const handleTokenClick = (token: Token) => {
    setSelectedToken(token);
  };

  const LoadingSkeleton = () => (
    <div className="space-y-2 p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex gap-4 p-3 border border-border rounded-lg">
          <Skeleton className="h-12 w-12 rounded-lg" />
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
      <p className="text-sm">No tokens found in this section.</p>
    </div>
  );

  const renderColumn = (tokens: Token[], statusType: TokenStatus) => {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <ColumnHeader
          status={statusType}
          count={tokens.length}
          preset="1"
          onFilterClick={() => setFilterModalStatus(statusType)}
          onLightningClick={() => console.log('Lightning clicked')}
          onWavesClick={() => console.log('Waves clicked')}
          onPresetChange={(p) => console.log('Preset changed', p)}
          selectedChain={selectedChain}
        />
        <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar">
          {status === 'idle' ? (
            <LoadingSkeleton />
          ) : tokens.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col">
              <AnimatePresence initial={false} mode="popLayout">
                {tokens.map((token) => (
                  <TokenCard
                    key={token.id}
                    token={token}
                    onClick={handleTokenClick}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <LayoutGroup>
      <div className="flex flex-col w-full h-full bg-background">
        {/* Main Content - 3 Columns */}
        <div className="flex-1 border-primaryStroke bg-backgroundSecondary border-[1px] flex flex-row w-full justify-start items-start rounded-[8px] sm:rounded-[4px] overflow-hidden">
          {/* New Pairs Column */}
          <div className="flex flex-col flex-1 h-full border-r border-primaryStroke/50 overflow-hidden">
            {renderColumn(newTokens, 'new')}
          </div>

          {/* Final Stretch Column */}
          <div className="flex flex-col flex-1 h-full border-r border-primaryStroke/50 overflow-hidden">
            {renderColumn(finalTokens, 'final')}
          </div>

          {/* Migrated Column */}
          <div className="flex flex-col flex-1 h-full overflow-hidden">
            {renderColumn(migratedTokens, 'migrated')}
          </div>
        </div>

        {/* Modals */}
        <TokenDetailModal
          token={selectedToken}
          isOpen={!!selectedToken}
          onClose={() => setSelectedToken(null)}
        />

        {filterModalStatus && (
          <FilterModal
            isOpen={!!filterModalStatus}
            onClose={() => setFilterModalStatus(null)}
            status={filterModalStatus}
          />
        )}
      </div>
    </LayoutGroup>
  );
};


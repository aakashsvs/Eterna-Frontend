import React from 'react';
import { Zap, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TokenStatus } from '@/types/token';

interface ColumnHeaderProps {
  status: TokenStatus;
  count: number;
  preset?: string;
  onFilterClick?: () => void;
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ status, count, preset, onFilterClick }) => {
  const labels = {
    new: 'New Pairs',
    final: 'Final Stretch',
    migrated: 'Migrated',
  };

  return (
    <div className="flex items-center justify-between px-3 py-2 mb-2 border-b border-border/50">
      <div className="flex items-center gap-2">
        <Zap size={14} className="text-purple-400" />
        <span className="text-sm font-semibold text-foreground">{labels[status]}</span>
        <span className="text-xs text-muted-foreground">({count})</span>
      </div>
      <div className="flex items-center gap-2">
        {preset && (
          <span className="text-[10px] text-muted-foreground px-1">P{preset}</span>
        )}
        <button 
          onClick={onFilterClick}
          className="p-1 hover:bg-muted/50 rounded transition-colors"
        >
          <Filter size={12} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};


import React from 'react';
import { SortKey, SortDirection } from '@/types/token';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

interface TableHeaderProps {
  onSort: (key: SortKey) => void;
  sortBy: SortKey;
  sortDirection: SortDirection;
}

const HeaderCell = ({ 
  label, 
  sortKey, 
  currentSort, 
  direction, 
  onClick,
  className
}: { 
  label: string; 
  sortKey?: SortKey; 
  currentSort: SortKey; 
  direction: SortDirection; 
  onClick: (k: SortKey) => void;
  className?: string;
}) => {
  if (!sortKey) return <div className={cn("text-xs font-semibold text-muted-foreground", className)}>{label}</div>;

  const isActive = currentSort === sortKey;

  return (
    <div 
      className={cn("flex items-center gap-1 text-xs font-semibold text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none", className)}
      onClick={() => onClick(sortKey)}
    >
      {label}
      {isActive ? (
        direction === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
      ) : (
        <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50" />
      )}
    </div>
  );
};

export const TableHeader: React.FC<TableHeaderProps> = ({ onSort, sortBy, sortDirection }) => {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_50px] gap-4 px-3 py-2 border-b border-border bg-muted/20 sticky top-0 z-10 backdrop-blur-sm">
      <div className="text-xs font-semibold text-muted-foreground">Token</div>
      
      <HeaderCell label="Price" sortKey="priceUsd" currentSort={sortBy} direction={sortDirection} onClick={onSort} />
      
      <HeaderCell label="Age" sortKey="createdAt" currentSort={sortBy} direction={sortDirection} onClick={onSort} />
      
      <HeaderCell label="Liq / MC" sortKey="marketCap" currentSort={sortBy} direction={sortDirection} onClick={onSort} />
      
      <HeaderCell label="Vol / Txns" sortKey="volume24h" currentSort={sortBy} direction={sortDirection} onClick={onSort} />
      
      <HeaderCell label="Change (24h)" sortKey="priceChange24h" currentSort={sortBy} direction={sortDirection} onClick={onSort} />
      
      <div className="text-xs font-semibold text-muted-foreground text-center">Actions</div>
    </div>
  );
};

import React from 'react';
import { Zap, Waves, Settings2 } from 'lucide-react';
import { TokenStatus } from '@/types/token';
import { SolIcon } from '../icons/sol-icon';
import { BnbIcon } from '../icons/bnb-icon';
interface ColumnHeaderProps {
  status: TokenStatus;
  count?: number;
  preset?: string;
  onFilterClick?: () => void;
  onLightningClick?: () => void;
  onWavesClick?: () => void;
  onPresetChange?: (preset: string) => void;
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ 
  status, 
  onFilterClick,
  onLightningClick,
  onWavesClick,
  onPresetChange
}) => {
  const labels = {
    new: 'New Pairs',
    final: 'Final Stretch',
    migrated: 'Migrated',
  };

  const showBonding = status === 'new';

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-transparent border-b border-border min-h-[48px] border-r border-border last:border-r-0">
      {/* Left: Title + Badge */}
      <div className="flex items-center gap-3">
        <span className="text-base font-bold text-[#FCFCFC]">{labels[status]}</span>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        {/* Lightning Counter */}
        <button 
          onClick={onLightningClick}
          className="flex items-center gap-1.5 px-2 py-1 rounded  text-xs font-mono text-blue-400 border border-blue-900/30 hover:bg-[#1e293b]/80 transition-colors"
        >
          <Zap size={10} className="fill-current" />
          <span>0</span>
          <span className="text-muted-foreground"> 
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <SolIcon width={13} height={13} />
          </div>
          </span>
        </button>

        {/* Waves Icon */}
        <button 
          onClick={onWavesClick}
          className="flex items-center justify-center w-6 h-6 rounded hover:bg-muted/50 transition-colors"
        >
          <Waves size={14} className="text-teal-400" />
        </button>

        {/* Presets Toggle */}
        <div className="flex items-center text-[10px] font-bold bg-[#1e293b] rounded border border-border overflow-hidden">
          <button onClick={() => onPresetChange?.('P1')} className="px-1.5 py-1 text-blue-400 bg-blue-900/20 hover:bg-blue-900/30 transition-colors">P1</button>
          <button onClick={() => onPresetChange?.('P2')} className="px-1.5 py-1 text-muted-foreground hover:bg-muted/50 transition-colors">P2</button>
          <button onClick={() => onPresetChange?.('P3')} className="px-1.5 py-1 text-muted-foreground hover:bg-muted/50 transition-colors">P3</button>
        </div>

        {/* Settings/Filter */}
        <button 
          onClick={onFilterClick}
          className="relative p-1.5 hover:bg-muted/50 rounded transition-colors group"
        >
          <Settings2 size={14} className="text-muted-foreground group-hover:text-foreground" />
          <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-500 rounded-full border border-card" />
        </button>
      </div>
    </div>
  );
};
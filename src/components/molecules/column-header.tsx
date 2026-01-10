import React from 'react';
import { Zap, Waves, Settings2 } from 'lucide-react';
import { TokenStatus } from '@/types/token';

interface ColumnHeaderProps {
  status: TokenStatus;
  count?: number; // Kept for compatibility but might not be shown in new design
  preset?: string;
  onFilterClick?: () => void;
}

export const ColumnHeader: React.FC<ColumnHeaderProps> = ({ status, onFilterClick }) => {
  const labels = {
    new: 'New Pairs',
    final: 'Final Stretch',
    migrated: 'Migrated',
  };

  const showBonding = status === 'new';

  return (
    <div className="flex items-center justify-between px-3 py-2 bg-card border-b border-border min-h-[48px]">
      {/* Left: Title + Badge */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-foreground">{labels[status]}</span>
        
        {showBonding && (
          <div className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#3f2008] text-orange-500 border border-orange-900/50">
            Bonding: 54.78%
          </div>
        )}
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-2">
        {/* Lightning Counter */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#1e293b] text-xs font-mono text-blue-400 border border-blue-900/30">
          <Zap size={10} className="fill-current" />
          <span>0</span>
          <span className="text-muted-foreground">≡</span>
        </div>

        {/* Waves Icon */}
        <div className="flex items-center justify-center w-6 h-6 rounded hover:bg-muted/50 transition-colors">
          <Waves size={14} className="text-teal-400" />
        </div>

        {/* Presets Toggle */}
        <div className="flex items-center text-[10px] font-bold bg-[#1e293b] rounded border border-border overflow-hidden">
          <div className="px-1.5 py-1 text-blue-400 bg-blue-900/20">P1</div>
          <div className="px-1.5 py-1 text-muted-foreground hover:bg-muted/50 cursor-pointer">P2</div>
          <div className="px-1.5 py-1 text-muted-foreground hover:bg-muted/50 cursor-pointer">P3</div>
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


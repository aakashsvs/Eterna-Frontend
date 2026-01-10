import React from 'react';
import { TokenStatus } from '@/types/token';
import { Zap, Waves, Settings2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SectionHeadersProps {
  activeSection: TokenStatus;
  onSectionChange: (section: TokenStatus) => void;
}

export const SectionHeaders: React.FC<SectionHeadersProps> = ({ activeSection, onSectionChange }) => {
  const sections: { id: TokenStatus; label: string; bonding?: string }[] = [
    { id: 'new', label: 'New Pairs', bonding: 'Bonding: 54.78%' },
    { id: 'final', label: 'Final Stretch' },
    { id: 'migrated', label: 'Migrated' },
  ];

  return (
    <div className="flex w-full border-b border-border bg-card/50">
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        
        return (
          <div 
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={cn(
              "flex-1 flex items-center justify-between px-4 py-3 cursor-pointer transition-colors border-r border-border last:border-r-0",
              isActive ? "bg-accent/10" : "hover:bg-accent/5"
            )}
          >
            <div className="flex items-center gap-4">
               <span className={cn(
                 "text-sm font-bold",
                 isActive ? "text-foreground" : "text-muted-foreground"
               )}>
                 {section.label}
               </span>
               
               {section.bonding && (
                 <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-orange-500/10 text-orange-500 border border-orange-500/20">
                   {section.bonding}
                 </span>
               )}
            </div>

            <div className="flex items-center gap-3">
              {/* Lightning Counter */}
              <div className="flex items-center gap-1 px-2 py-1 rounded bg-secondary/30 border border-border text-xs">
                <Zap size={10} className="fill-current" />
                <span>0</span>
              </div>

              {/* Waves Icon */}
              <Waves size={14} className="text-teal-500" />

              {/* P1 P2 P3 Toggle */}
              <div className="flex items-center text-[10px] font-bold bg-secondary/20 rounded border border-border overflow-hidden">
                <div className="px-1.5 py-1 hover:bg-secondary/40 text-blue-400">P1</div>
                <div className="px-1.5 py-1 hover:bg-secondary/40 text-muted-foreground">P2</div>
                <div className="px-1.5 py-1 hover:bg-secondary/40 text-muted-foreground">P3</div>
              </div>

              {/* Settings Filter */}
              <div className="relative">
                <Settings2 size={14} className="text-muted-foreground" />
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-blue-500 rounded-full" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

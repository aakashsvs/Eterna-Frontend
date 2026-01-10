import React from 'react';
import { TokenStatus } from '@/types/token';
import { cn } from '@/lib/utils';
import { Button } from '../atoms/button';

interface FilterTabsProps {
  activeTab: TokenStatus;
  onTabChange: (tab: TokenStatus) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { id: TokenStatus; label: string }[] = [
    { id: 'new', label: 'New Pairs' },
    { id: 'final', label: 'Final Stretch' },
    { id: 'migrated', label: 'Migrated' },
  ];

  return (
    <div className="flex p-1 bg-secondary/50 rounded-lg w-fit">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          size="sm"
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "rounded-md transition-all duration-200 font-medium text-xs sm:text-sm px-4",
            activeTab === tab.id 
              ? "bg-background shadow-sm text-foreground" 
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          )}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

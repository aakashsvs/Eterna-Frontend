"use client"

import React, { useState } from 'react';
import { Settings, Star, BarChart3, Grid3x3, List, Volume2 } from 'lucide-react';
import { Button } from '../atoms/button';
import { cn } from '@/lib/utils';
import { MetricsPanel } from './metrics-panel';

export const PulseHeader = () => {
  const [isMetricsPanelOpen, setIsMetricsPanelOpen] = useState(false);
  return (
    <div className="p-4 border-b border-border bg-card/30">
      <div className="flex items-center justify-between mb-4">
        {/* Left Section - Title and Icons */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Pulse</h1>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xs">≡</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xs font-bold">B</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
              <Settings size={16} className="text-muted-foreground" />
            </button>
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
              <Star size={16} className="text-muted-foreground" />
            </button>
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
              <BarChart3 size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Right Section - Display Options */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMetricsPanelOpen(!isMetricsPanelOpen)}
            className="px-3 py-1.5 text-sm bg-muted/50 border border-border rounded-md text-foreground hover:bg-muted transition-colors flex items-center gap-2"
          >
            Display
            <span className="text-xs">▼</span>
          </button>
          
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
              <Grid3x3 size={16} className="text-muted-foreground" />
            </button>
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
              <List size={16} className="text-muted-foreground" />
            </button>
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
              <Volume2 size={16} className="text-muted-foreground" />
            </button>
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
              <Settings size={16} className="text-muted-foreground" />
            </button>
          </div>
          
          <div className="text-xs text-muted-foreground px-2">
            1 = 0
          </div>
        </div>
      </div>

      <MetricsPanel 
        isOpen={isMetricsPanelOpen} 
        onClose={() => setIsMetricsPanelOpen(false)} 
      />
    </div>
  );
};


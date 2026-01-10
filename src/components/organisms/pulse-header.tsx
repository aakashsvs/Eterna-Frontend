"use client"

import React from 'react';
import { Settings, Star, BarChart3, Grid3x3, List, Volume2, HelpCircle, Bookmark, Crosshair, Wallet } from 'lucide-react';

export const PulseHeader = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-[#06070B] min-h-[56px]">
      {/* Left Section - Title and Icons */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Pulse</h1>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#1e293b] flex items-center justify-center text-primaryBlue border border-border">
            <span className="text-xs">≡</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#1e293b] flex items-center justify-center text-yellow-500 border border-border">
            <span className="text-xs font-bold">B</span>
          </div>
        </div>
        <div className="h-6 w-px bg-border mx-2" />
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-muted/50 rounded transition-colors text-muted-foreground hover:text-foreground">
            <Settings size={18} />
          </button>
          <button className="p-2 hover:bg-muted/50 rounded transition-colors text-muted-foreground hover:text-foreground">
            <Star size={18} />
          </button>
          <button className="p-2 hover:bg-muted/50 rounded transition-colors text-muted-foreground hover:text-foreground">
            <BarChart3 size={18} />
          </button>
        </div>
      </div>

      {/* Right Section - Display Options */}
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-muted/50 rounded transition-colors text-muted-foreground hover:text-foreground">
          <HelpCircle size={20} />
        </button>

        <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1e293b] border border-border rounded-full hover:bg-muted/80 transition-colors">
          <List size={16} className="text-foreground" />
          <span className="text-sm font-bold text-foreground">Display</span>
          <span className="text-xs text-muted-foreground">▼</span>
        </button>

        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-muted/50 rounded transition-colors text-muted-foreground hover:text-foreground">
            <Bookmark size={18} />
          </button>
          <button className="p-2 hover:bg-muted/50 rounded transition-colors text-muted-foreground hover:text-foreground">
            <Grid3x3 size={18} />
          </button>
          <button className="p-2 hover:bg-muted/50 rounded transition-colors text-muted-foreground hover:text-foreground">
            <Volume2 size={18} />
          </button>
          <button className="p-2 hover:bg-muted/50 rounded transition-colors text-muted-foreground hover:text-foreground">
            <Crosshair size={18} />
          </button>
        </div>

        <button className="flex items-center gap-2 px-3 py-1.5 bg-[#1e293b] border border-border rounded-full hover:bg-muted/80 transition-colors">
          <Wallet size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">1</span>
          <span className="text-muted-foreground">≡</span>
          <span className="text-sm font-medium text-foreground">0</span>
          <span className="text-xs text-muted-foreground">▼</span>
        </button>
      </div>
    </div>
  );
};
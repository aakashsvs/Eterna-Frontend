"use client"

import React, { useState } from 'react';
import { Wallet, Twitter, Bell, Calendar, MessageCircle, FileText, Palette } from 'lucide-react';
import { CustomizeThemeModal } from './customize-theme-modal';

export const BottomStatusBar = () => {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  return (
    <div className="w-full border-t border-border bg-card/50 backdrop-blur-sm sticky bottom-0 z-50">
      <div className="flex items-center justify-between px-4 h-12">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <select className="px-2 py-1 text-xs bg-muted/50 border border-border rounded-md text-foreground">
            <option>PRESET 1</option>
          </select>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>1 = 0</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
              <Wallet size={16} className="text-muted-foreground" />
            </button>
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
              <Twitter size={16} className="text-muted-foreground" />
            </button>
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
              <span className="text-xs text-muted-foreground">Discover</span>
            </button>
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
              <span className="text-xs text-purple-400">Pulse</span>
            </button>
            <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
              <span className="text-xs text-muted-foreground">PnL</span>
            </button>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-md">
            <span className="text-sm font-semibold text-green-400">$136.43</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs text-green-400">Connection is stable</span>
          </div>
          
          <select className="px-2 py-1 text-xs bg-muted/50 border border-border rounded-md text-foreground">
            <option>GLOBAL</option>
          </select>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsThemeModalOpen(true)}
            className="p-1.5 hover:bg-muted/50 rounded transition-colors"
          >
            <Palette size={16} className="text-muted-foreground" />
          </button>
          <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
            <Calendar size={16} className="text-muted-foreground" />
          </button>
          <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
            <Bell size={16} className="text-muted-foreground" />
          </button>
          <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
            <MessageCircle size={16} className="text-muted-foreground" />
          </button>
          <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
            <Twitter size={16} className="text-muted-foreground" />
          </button>
          <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
            <FileText size={16} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <CustomizeThemeModal 
        isOpen={isThemeModalOpen} 
        onClose={() => setIsThemeModalOpen(false)} 
      />
    </div>
  );
};


"use client"

import React from 'react';
import { Search, Star, Bell, Wallet, Settings, Zap } from 'lucide-react';
import { Button } from '../atoms/button';
import { cn } from '@/lib/utils';

export const TopNavbar = () => {
  const navItems = [
    { label: 'Discover', active: false },
    { label: 'Pulse', active: true },
    { label: 'Trackers', active: false },
    { label: 'Perpetuals', active: false },
    { label: 'Yield', active: false },
    { label: 'Vision', active: false },
    { label: 'Portfolio', active: false },
  ];

  return (
    <nav className="w-full border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left Section - Logo and Nav Items */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-foreground"></div>
          </div>
          
          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                  item.active
                    ? "text-purple-400 bg-purple-400/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-muted/50 rounded-md transition-colors">
            <Search size={18} className="text-muted-foreground" />
          </button>
          
          <select className="px-3 py-1.5 text-sm bg-muted/50 border border-border rounded-md text-foreground">
            <option>SOL</option>
          </select>
          
          <Button className="bg-purple-500 hover:bg-purple-600 text-white px-4">
            Deposit
          </Button>
          
          <button className="p-2 hover:bg-muted/50 rounded-md transition-colors">
            <Star size={18} className="text-muted-foreground" />
          </button>
          
          <button className="p-2 hover:bg-muted/50 rounded-md transition-colors relative">
            <Bell size={18} className="text-muted-foreground" />
          </button>
          
          <div className="flex items-center gap-1 px-2 py-1 bg-muted/50 rounded-md">
            <Wallet size={16} className="text-muted-foreground" />
            <span className="text-xs text-foreground">0</span>
          </div>
          
          <div className="flex items-center gap-1 px-2 py-1 bg-muted/50 rounded-md">
            <Zap size={16} className="text-muted-foreground" />
            <span className="text-xs text-foreground">0</span>
          </div>
          
          <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
            <span className="text-xs font-semibold text-purple-400">08</span>
          </div>
          
          <button className="p-2 hover:bg-muted/50 rounded-md transition-colors">
            <Settings size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>
    </nav>
  );
};


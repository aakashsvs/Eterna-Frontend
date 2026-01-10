"use client"

import React, { useState } from 'react';
import { 
  Wallet, Twitter, Compass, Activity, BarChart3, Settings, 
  LayoutTemplate, Bell, Palette, MessageSquare, FileText, 
  Database, Link, ChevronDown, LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CustomizeThemeModal } from './customize-theme-modal';

export const BottomStatusBar = () => {
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const NavItem = ({ icon: Icon, label, hasDot }: { icon?: LucideIcon, label: string, hasDot?: boolean }) => (
    <button className="flex items-center gap-2 px-2 py-1 hover:bg-muted/50 rounded transition-colors relative group">
      {Icon && <Icon size={16} className="text-muted-foreground group-hover:text-foreground" />}
      <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">{label}</span>
      {hasDot && (
        <span className="absolute top-1 right-0 w-1.5 h-1.5 bg-pink-500 rounded-full border border-card" />
      )}
    </button>
  );

  const CryptoPrice = ({ symbol, price, color }: { symbol: string, price: string, color: string }) => (
    <div className="flex items-center gap-1.5 px-2">
      <div className={cn("w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-background", color)}>
        {symbol[0]}
      </div>
      <span className={cn("text-xs font-medium", color.replace('bg-', 'text-'))}>{price}</span>
    </div>
  );

  return (
    <div className="w-full border-t border-border bg-[#050505] sticky bottom-0 z-50 h-10 px-2 flex items-center justify-between font-sans text-sm">
      {/* Left Group */}
      <div className="flex items-center gap-2 h-full">
        {/* Preset Button */}
        <button className="flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded hover:bg-indigo-500/20 transition-colors text-xs font-bold tracking-wide">
          <Settings size={12} />
          PRESET 1
        </button>

        {/* Wallet Pill */}
        <button className="flex items-center gap-2 px-3 py-1 bg-secondary/30 border border-border rounded-full hover:bg-secondary/50 transition-colors ml-2">
          <Wallet size={14} className="text-muted-foreground" />
          <span className="text-xs font-mono">1</span>
          <span className="text-muted-foreground">≡</span>
          <span className="text-xs font-mono">0</span>
          <ChevronDown size={12} className="text-muted-foreground" />
        </button>

        <div className="w-px h-4 bg-border mx-2" />

        <button className="p-1.5 hover:bg-muted/50 rounded-md text-muted-foreground hover:text-foreground transition-colors">
          <Settings size={16} />
        </button>

        <NavItem icon={Wallet} label="Wallet" hasDot />
        <NavItem icon={Twitter} label="Twitter" hasDot />
        <NavItem icon={Compass} label="Discover" hasDot />
        <NavItem icon={Activity} label="Pulse" hasDot />
        
        <div className="flex items-center gap-2 px-2 py-1 hover:bg-muted/50 rounded transition-colors cursor-pointer border-l border-transparent hover:border-border">
          <BarChart3 size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">PnL</span>
        </div>
      </div>

      {/* Center Group - Market Data */}
      <div className="flex items-center h-full gap-4">
        {/* Token Pill */}
        <div className="px-3 py-1 bg-green-900/10 border border-green-500/20 rounded-full flex items-center gap-2">
           <span className="text-xs">💊 🦊 💰</span>
        </div>

        <div className="w-px h-4 bg-border" />

        <CryptoPrice symbol="Bitcoin" price="$90.5K" color="bg-orange-500" />
        <CryptoPrice symbol="Ethereum" price="$3088" color="bg-blue-500" />
        <CryptoPrice symbol="Solana" price="$135.97" color="bg-purple-500" />

        <div className="flex items-center gap-4 text-xs text-muted-foreground ml-2">
           <div className="flex items-center gap-1">
             <Link size={12} />
             <span>$55.9K</span>
           </div>
           <div className="flex items-center gap-1">
             <FileText size={12} />
             <span>0.0<sub className="bottom-0">2</sub>48</span>
           </div>
           <div className="flex items-center gap-1">
             <Database size={12} />
             <span>0.0642</span>
           </div>
        </div>
      </div>

      {/* Right Group */}
      <div className="flex items-center h-full gap-2">
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-500 text-xs font-medium">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          Connection is stable
        </div>

        <button className="flex items-center gap-1 px-2 py-1 hover:bg-muted/50 rounded text-xs font-medium text-muted-foreground hover:text-foreground ml-2">
          GLOBAL
          <ChevronDown size={12} />
        </button>

        <div className="w-px h-4 bg-border mx-1" />

        <button className="p-1.5 hover:bg-muted/50 rounded text-muted-foreground hover:text-foreground">
          <LayoutTemplate size={16} />
        </button>
        <button className="p-1.5 hover:bg-muted/50 rounded text-muted-foreground hover:text-foreground">
          <Bell size={16} />
        </button>
        <button 
          onClick={() => setIsThemeModalOpen(true)}
          className="p-1.5 hover:bg-muted/50 rounded text-muted-foreground hover:text-foreground"
        >
          <Palette size={16} />
        </button>
        <button className="p-1.5 hover:bg-muted/50 rounded text-muted-foreground hover:text-foreground">
          <MessageSquare size={16} />
        </button>
        <button className="p-1.5 hover:bg-muted/50 rounded text-muted-foreground hover:text-foreground">
          <Twitter size={16} />
        </button>
        <button className="flex items-center gap-1 px-2 py-1 hover:bg-muted/50 rounded text-muted-foreground hover:text-foreground text-xs font-medium">
          <FileText size={14} />
          Docs
        </button>
      </div>

      <CustomizeThemeModal 
        isOpen={isThemeModalOpen} 
        onClose={() => setIsThemeModalOpen(false)} 
      />
    </div>
  );
};


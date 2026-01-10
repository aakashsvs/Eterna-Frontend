"use client"

import React, { useState } from 'react';
import { 
  Wallet, Twitter, Compass, Activity, BarChart3, Settings, 
  LayoutTemplate, Bell, Palette, MessageSquare, FileText, 
  Database, Link, ChevronDown, LucideIcon
} from 'lucide-react';
import { BtcIcon } from '../icons/btc-icon';
import { EthIcon } from '../icons/eth-icon';
import { SolIcon } from '../icons/sol-icon';
import { PumpIcon } from '../icons/pump-icon';
import { BonkIcon } from '../icons/bonk-icon';
import { BagsIcon } from '../icons/bags-icon';
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

  const CryptoPrice = ({ Icon, price, color }: { symbol: string, Icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>, price: string, color: string }) => (
    <div className="flex items-center gap-1.5 px-2 cursor-pointer hover:brightness-110 transition-all">
      <Icon width={16} height={16} />
      <span className={cn("text-xs font-medium", color)}>{price}</span>
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
        <div className="px-3 py-1 bg-gradient-to-r from-[#53D38E]/30 via-[#E78C19]/30 to-[#3E6200]/30 border border-white/5 rounded-full flex items-center gap-2 relative overflow-hidden">
           <div className="flex items-center gap-1 z-10">
             <PumpIcon width={11} height={11} />
             <BonkIcon width={11} height={11} />
             <BagsIcon width={11} height={11} />
           </div>
        </div>

        <div className="w-px h-4 bg-border" />

        <CryptoPrice symbol="BTC" Icon={BtcIcon} price="$90.5K" color="text-[#F7931A]" />
        <CryptoPrice symbol="ETH" Icon={EthIcon} price="$3088" color="text-[#497493]" />
        <CryptoPrice symbol="SOL" Icon={SolIcon} price="$135.97" color="text-[#14F195]" />

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
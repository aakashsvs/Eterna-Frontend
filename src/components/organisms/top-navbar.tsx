"use client"

import React, { useState } from 'react';
import { Search, ChevronDown, HelpCircle, List, Bookmark, Keyboard, Volume2, Crosshair, Wallet, Settings, LucideIcon } from 'lucide-react';
import { AxiomLogo } from '../icons/axiom-logo';
import { SolIcon } from '../icons/sol-icon';
import { cn } from '@/lib/utils';

export const TopNavbar = () => {
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false);

  const NavLink = ({ label, isActive = false }: { label: string, isActive?: boolean }) => (
    <button className={cn(
      "flex flex-row h-[32px] text-nowrap px-[8px] xl:px-[14px] justify-start items-center rounded-[4px] transition-colors duration-150 ease-in-out hover:bg-primary/20",
      isActive ? "text-primary hover:text-primary" : "text-foreground hover:text-primary"
    )}>
      <span className="text-[14px] font-medium">{label}</span>
    </button>
  );

  const IconButton = ({ icon: Icon, className }: { icon: LucideIcon, className?: string }) => (
    <button type="button" className={cn(
      "group flex items-center justify-center w-8 h-8 relative rounded-full hover:bg-muted/60 transition-colors duration-150",
      className
    )}>
      <Icon size={16} className="text-muted-foreground group-hover:text-foreground transition-colors duration-150" />
    </button>
  );

  return (
    <div id="platform-layout" className="w-full bg-background border-b border-muted z-50">
      <div className="flex flex-row w-full h-[52px] sm:h-[64px] min-h-[48px] sm:min-h-[64px] px-[16px] sm:px-[16px] lg:px-[24px] gap-[16px] sm:gap-[16px] lg:gap-[24px] justify-between sm:justify-start items-center overflow-hidden">
        
        {/* Logo and Nav Links */}
        <div className="flex flex-row flex-shrink-0 gap-[0px] justify-start items-center">
          <a href="#" className="flex flex-row items-center mr-6">
            <AxiomLogo className="text-foreground w-[36px] h-[36px]" />
            <span className="ml-2 text-xl font-bold tracking-tight hidden 2xl:block text-foreground">AXIOM</span>
          </a>

          <div className="hidden lg:flex flex-row gap-[4px] justify-start items-center">
            <NavLink label="Discover" />
            <NavLink label="Pulse" isActive />
            <NavLink label="Trackers" />
            <NavLink label="Perpetuals" />
            <NavLink label="Yield" />
            <NavLink label="Vision" />
            <NavLink label="Portfolio" />
            <NavLink label="Rewards" />
          </div>
        </div>

        {/* Search and Chain Selector */}
        <div className="flex flex-row gap-[16px] justify-start items-center ml-auto">
          {/* Search Bar */}
          <button type="button" className="hidden sm:flex flex-shrink-0 whitespace-nowrap border border-muted font-normal flex-row h-[32px] px-[8px] 2xl:pl-[12px] 2xl:pr-[6px] gap-[8px] justify-center items-center rounded-full hover:bg-muted/35 transition-colors duration-125 cursor-pointer">
            <Search size={18} className="text-foreground" />
            <span className="text-[12px] text-muted-foreground font-medium hidden 2xl:block">Search by token or CA...</span>
            <div className="hidden 2xl:flex border border-muted text-[12px] h-[20px] px-[8px] gap-[8px] justify-center items-center rounded-full">
              <span className="text-foreground">/</span>
            </div>
          </button>

          {/* Chain Selector */}
          <div className="relative hidden sm:block">
            <button 
              className="hover:brightness-125 border-[2px] border-[#14F195]/10 flex flex-shrink-0 flex-row h-[32px] pl-[8px] pr-[6px] gap-[6px] justify-center items-center rounded-full transition-all duration-150 ease-in-out active:scale-[0.96]"
              onClick={() => setIsChainDropdownOpen(!isChainDropdownOpen)}
            >
              <SolIcon width={16} height={16} />
              <span className="text-[14px] text-foreground font-medium">SOL</span>
              <ChevronDown size={18} className="text-foreground" />
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-[8px] sm:gap-[16px]">
          {/* Deposit Button */}
          <button className="hidden sm:flex bg-primary h-[32px] px-[12px] flex-row justify-start items-center rounded-full hover:bg-primary/90 transition-colors">
            <span className="text-nowrap text-background text-[14px] font-bold">Deposit</span>
          </button>

          <div className="w-[1px] h-[24px] bg-muted hidden sm:block"></div>

          {/* Icon Actions */}
          <div className="flex flex-row gap-4 items-center">
            <IconButton icon={HelpCircle} />
            
            {/* Display Dropdown */}
            <button className="bg-muted flex flex-row h-[32px] px-[12px] gap-[8px] justify-center items-center rounded-full hover:bg-muted/80 transition-color duration-[150ms] ease-in-out">
              <List size={18} className="text-foreground" />
              <span className="text-[14px] font-bold text-foreground">Display</span>
              <ChevronDown size={18} className="text-foreground" />
            </button>

            <IconButton icon={Bookmark} className="-mr-[5px]" />
            <IconButton icon={Keyboard} className="-mr-[5px]" />
            <IconButton icon={Volume2} className="-mr-[5px]" />
            <div className="relative group flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted/60 transition-colors cursor-pointer">
               <Crosshair size={16} className="text-muted-foreground group-hover:text-foreground" />
               <Settings size={12} className="text-muted-foreground group-hover:text-foreground absolute bottom-0 right-0" />
            </div>

            {/* Wallet Button */}
            <button className="flex border border-muted group flex-row p-[4px] pr-[12px] pl-[12px] h-[32px] gap-[8px] justify-center items-center hover:bg-muted/35 transition-colors duration-125 cursor-pointer rounded-full">
              <div className="flex flex-row gap-[4px] justify-center items-center">
                <Wallet size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="text-[14px] text-muted-foreground font-medium group-hover:text-foreground transition-colors">1</span>
              </div>
              <div className="flex flex-row gap-[4px] justify-center items-center">
                <SolIcon width={16} height={16} />
                <span className="text-[14px] text-foreground font-medium">0</span>
              </div>
              <ChevronDown size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
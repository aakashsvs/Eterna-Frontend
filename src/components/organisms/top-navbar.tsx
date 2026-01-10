"use client"

import React, { useState } from 'react';
import { Search, ChevronDown, Settings, LucideIcon, Star, Bell } from 'lucide-react';
import { AxiomLogo } from '../icons/axiom-logo';
import { SolIcon } from '../icons/sol-icon';
import { cn } from '@/lib/utils';

export const TopNavbar = () => {
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false);

  const NavLink = ({ label, isActive = false }: { label: string, isActive?: boolean }) => (
    <button className={cn(
      "flex flex-row h-[32px] text-nowrap px-[8px] xl:px-[14px] justify-start items-center rounded-[4px] transition-colors duration-150 ease-in-out hover:bg-primary/20",
      isActive ? "text-primaryBlue hover:text-primaryBlue" : "text-textPrimary hover:text-primaryBlue"
    )}>
      <span className="text-[14px] font-medium">{label}</span>
    </button>
  );

  const IconButton = ({ icon: Icon, className }: { icon: LucideIcon, className?: string }) => (
    <button type="button" className={cn(
      "group flex items-center justify-center w-8 h-8 relative rounded-full hover:bg-muted/60 transition-colors duration-150",
      className
    )}>
      <Icon size={16} className="text-textTertiary group-hover:text-textPrimary transition-colors duration-150" />
    </button>
  );

  return (
    <div id="platform-layout" className="w-full bg-background border-b border-muted z-50">
      <div className="flex flex-row w-full h-[52px] sm:h-[64px] min-h-[48px] sm:min-h-[64px] px-[16px] sm:px-[16px] lg:px-[24px] gap-[16px] sm:gap-[16px] lg:gap-[24px] justify-between sm:justify-start items-center overflow-hidden">
        
        {/* Logo and Nav Links */}
        <div className="flex flex-row flex-shrink-0 gap-[0px] justify-start items-center">
          <a href="#" className="flex flex-row items-center mr-6">
            <AxiomLogo className="text-textPrimary w-[36px] h-[36px]" />
            <span className="ml-2 text-xl font-bold tracking-tight hidden 2xl:block text-textPrimary">AXIOM</span>
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
            <Search size={18} className="text-textPrimary" />
            <span className="text-[12px] text-textTertiary font-medium hidden 2xl:block">Search by token or CA...</span>
            <div className="hidden 2xl:flex border border-muted text-[12px] h-[20px] px-[8px] gap-[8px] justify-center items-center rounded-full">
              <span className="text-textPrimary">/</span>
            </div>
          </button>

          {/* Chain Selector */}
          <div className="relative hidden sm:block">
            <button 
              className="hover:brightness-125 border-[2px] border-primaryBlue/10 flex flex-shrink-0 flex-row h-[32px] pl-[8px] pr-[6px] gap-[6px] justify-center items-center rounded-full transition-all duration-150 ease-in-out active:scale-[0.96]"
              onClick={() => setIsChainDropdownOpen(!isChainDropdownOpen)}
            >
              <SolIcon width={16} height={16} />
              <span className="text-[14px] text-textPrimary font-medium">SOL</span>
              <ChevronDown size={18} className="text-textPrimary" />
            </button>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-[8px] sm:gap-[16px]">
          {/* Deposit Button */}
          <button className="hidden sm:flex bg-primaryBlue h-[32px] px-[12px] flex-row justify-start items-center rounded-full hover:brightness-110 transition-all">
            <span className="text-nowrap text-background text-[14px] font-bold">Deposit</span>
          </button>

          <div className="w-[1px] h-[24px] bg-muted hidden sm:block"></div>

          {/* Icon Actions */}
          <div className="flex flex-row gap-4 items-center">
            <IconButton icon={Star} />
            <IconButton icon={Bell} />
            
            <div className="w-8 h-8 rounded-full bg-primaryBlue/20 flex items-center justify-center border border-primaryBlue/30">
              <span className="text-xs font-semibold text-primaryBlue">08</span>
            </div>

            <IconButton icon={Settings} />
          </div>
        </div>
      </div>
    </div>
  );
};
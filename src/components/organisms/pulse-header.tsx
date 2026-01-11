"use client"

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Grid3x3, List, Volume2, HelpCircle, Bookmark, Keyboard, Crosshair, Wallet, ChevronDown } from 'lucide-react';
import { MetricsPanel } from './metrics-panel';
import { HelpPopup } from './help-popup';
import { BlacklistModal } from './blacklist-modal';
import { HotkeysModal } from './hotkeys-modal';
import { AlertsModal } from './alerts-modal';
import { SnipeSettingsModal } from './snipe-settings-modal';
import { WalletDropdown } from './wallet-dropdown';
import { SolIcon } from '../icons/sol-icon';
import { BnbIcon } from '../icons/bnb-icon';
import { Tooltip, TooltipContent, TooltipTrigger } from '../atoms/tooltip';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectTokenState, setSelectedChain } from '@/store/features/tokens/tokenSlice';

export const PulseHeader = () => {
  const dispatch = useAppDispatch();
  const { selectedChain } = useAppSelector(selectTokenState);
  // const [selectedChain, setSelectedChain] = useState<'SOL' | 'BNB'>('SOL'); // Removed local state
  const [isMetricsPanelOpen, setIsMetricsPanelOpen] = useState(false);
  const [isHelpPopupOpen, setIsHelpPopupOpen] = useState(false);
  const [isBlacklistModalOpen, setIsBlacklistModalOpen] = useState(false);
  const [isHotkeysModalOpen, setIsHotkeysModalOpen] = useState(false);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);
  const [isSnipeSettingsModalOpen, setIsSnipeSettingsModalOpen] = useState(false);
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const walletButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative z-50 flex items-center justify-between px-4 py-2 border-b border-border bg-background min-h-[56px]">

      {/* Left Section - Title and Icons */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-textPrimary">Pulse</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              console.log('Dispatching SOL');
              dispatch(setSelectedChain('SOL'));
            }}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer relative z-50",
              selectedChain === 'SOL'
                ? "bg-primary/10 border-primary/20 opacity-100"
                : "bg-primary/5 border-primary/10 opacity-40 hover:opacity-80"
            )}
          >
            <SolIcon width={18} height={18} />
          </button>
          <button
            onClick={() => {
              console.log('Dispatching BNB');
              dispatch(setSelectedChain('BNB'));
            }}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer relative z-50",
              selectedChain === 'BNB'
                ? "bg-yellow-500/10 border-yellow-500/20 opacity-100"
                : "bg-yellow-500/5 border-yellow-500/10 opacity-40 hover:opacity-80"
            )}
          >
            <BnbIcon width={18} height={18} />
          </button>
        </div>
        <div className="h-6 w-px bg-border mx-2" />
        <div className="flex items-center gap-1">

        </div>
      </div>

      {/* Right Section - Display Options */}
      <div className="flex items-center gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setIsHelpPopupOpen(!isHelpPopupOpen)}
              className="p-2 hover:bg-muted/50 rounded transition-colors text-textTertiary hover:text-textPrimary"
            >
              <HelpCircle size={20} />
            </button>
          </TooltipTrigger>
          <TooltipContent className="bg-[#1e293b] text-white border-none rounded-full text-xs px-3 py-1">
            <p>Help</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => setIsMetricsPanelOpen(!isMetricsPanelOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-muted border border-border rounded-full hover:bg-secondaryStroke transition-colors"
            >
              <List size={16} className="text-textPrimary" />
              <span className="text-sm font-bold text-textPrimary">Display</span>
              <ChevronDown size={14} className="text-textTertiary" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="bg-[#1e293b] text-white border-none rounded-full text-xs px-3 py-1">
            <p>Display Settings</p>
          </TooltipContent>
        </Tooltip>

        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => setIsBlacklistModalOpen(true)} className="p-2 hover:bg-muted/50 rounded transition-colors text-textTertiary hover:text-textPrimary">
                <Bookmark size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1e293b] text-white border-none rounded-full text-xs px-3 py-1">
              <p>Blacklist</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button className="p-2 hover:bg-muted/50 rounded transition-colors text-textTertiary hover:text-textPrimary">
                <Grid3x3 size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1e293b] text-white border-none rounded-full text-xs px-3 py-1">
              <p>Grid View</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => setIsHotkeysModalOpen(true)} className="p-2 hover:bg-muted/50 rounded transition-colors text-textTertiary hover:text-textPrimary">
                <Keyboard size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1e293b] text-white border-none rounded-full text-xs px-3 py-1">
              <p>Hotkeys</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => setIsAlertsModalOpen(true)} className="p-2 hover:bg-muted/50 rounded transition-colors text-textTertiary hover:text-textPrimary">
                <Volume2 size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1e293b] text-white border-none rounded-full text-xs px-3 py-1">
              <p>Alerts</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => setIsSnipeSettingsModalOpen(true)} className="p-2 hover:bg-muted/50 rounded transition-colors text-textTertiary hover:text-textPrimary">
                <Crosshair size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-[#1e293b] text-white border-none rounded-full text-xs px-3 py-1">
              <p>Snipe Settings</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <button
              ref={walletButtonRef}
              onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 bg-muted border border-border rounded-full hover:bg-secondaryStroke transition-colors"
            >
              <Wallet size={16} className="text-textTertiary" />
              <span className="text-sm font-medium text-textSecondary">1</span>
              <span className="text-textTertiary">≡</span>
              {selectedChain === 'SOL' ? (
                <SolIcon width={14} height={14} />
              ) : (
                <BnbIcon width={14} height={14} />
              )}
              <span className="text-sm font-medium text-textPrimary">0</span>
              <ChevronDown size={14} className="text-textTertiary" />
            </button>
          </TooltipTrigger>
          <TooltipContent className="bg-[#1e293b] text-white border-none rounded-full text-xs px-3 py-1">
            <p>Wallet</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <MetricsPanel isOpen={isMetricsPanelOpen} onClose={() => setIsMetricsPanelOpen(false)} />
      <HelpPopup isOpen={isHelpPopupOpen} onClose={() => setIsHelpPopupOpen(false)} />
      <BlacklistModal isOpen={isBlacklistModalOpen} onClose={() => setIsBlacklistModalOpen(false)} />
      <HotkeysModal isOpen={isHotkeysModalOpen} onClose={() => setIsHotkeysModalOpen(false)} />
      <AlertsModal isOpen={isAlertsModalOpen} onClose={() => setIsAlertsModalOpen(false)} />
      <SnipeSettingsModal isOpen={isSnipeSettingsModalOpen} onClose={() => setIsSnipeSettingsModalOpen(false)} />
      <WalletDropdown isOpen={isWalletDropdownOpen} onClose={() => setIsWalletDropdownOpen(false)} triggerRef={walletButtonRef} />
    </div>
  );
};
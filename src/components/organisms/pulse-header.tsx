"use client"

import React, { useState, useRef } from 'react';
import { Settings, Star, BarChart3, Grid3x3, List, Volume2, HelpCircle, Bookmark, Keyboard, Crosshair, Wallet, ChevronDown } from 'lucide-react';
import { MetricsPanel } from './metrics-panel';
import { HelpPopup } from './help-popup';
import { BlacklistModal } from './blacklist-modal';
import { HotkeysModal } from './hotkeys-modal';
import { AlertsModal } from './alerts-modal';
import { SnipeSettingsModal } from './snipe-settings-modal';
import { WalletDropdown } from './wallet-dropdown';
import { SolIcon } from '../icons/sol-icon';

export const PulseHeader = () => {
  const [isMetricsPanelOpen, setIsMetricsPanelOpen] = useState(false);
  const [isHelpPopupOpen, setIsHelpPopupOpen] = useState(false);
  const [isBlacklistModalOpen, setIsBlacklistModalOpen] = useState(false);
  const [isHotkeysModalOpen, setIsHotkeysModalOpen] = useState(false);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);
  const [isSnipeSettingsModalOpen, setIsSnipeSettingsModalOpen] = useState(false);
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const walletButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background min-h-[56px]">
      {/* Left Section - Title and Icons */}
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold text-textPrimary">Pulse</h1>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-primaryBlue border border-border">
            <span className="text-xs">≡</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-yellow-500 border border-border">
            <span className="text-xs font-bold">B</span>
          </div>
        </div>
        <div className="h-6 w-px bg-border mx-2" />
        <div className="flex items-center gap-1">
          <button className="p-2 hover:bg-muted/50 rounded transition-colors text-textTertiary hover:text-textPrimary">
            <Settings size={18} />
          </button>
          <button className="p-2 hover:bg-muted/50 rounded transition-colors text-textTertiary hover:text-textPrimary">
            <Star size={18} />
          </button>
          <button className="p-2 hover:bg-muted/50 rounded transition-colors text-textTertiary hover:text-textPrimary">
            <BarChart3 size={18} />
          </button>
        </div>
      </div>

      {/* Right Section - Display Options */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsHelpPopupOpen(!isHelpPopupOpen)}
          className="p-2 hover:bg-muted/50 rounded transition-colors text-textTertiary hover:text-textPrimary"
        >
          <HelpCircle size={20} />
        </button>

        <button 
          onClick={() => setIsMetricsPanelOpen(!isMetricsPanelOpen)}
          className="flex items-center gap-2 px-3 py-1.5 bg-muted border border-border rounded-full hover:bg-secondaryStroke transition-colors"
        >
          <List size={16} className="text-textPrimary" />
          <span className="text-sm font-bold text-textPrimary">Display</span>
          <ChevronDown size={14} className="text-textTertiary" />
        </button>

        <div className="flex items-center gap-1">
          <button onClick={() => setIsBlacklistModalOpen(true)} className="p-2 hover:bg-muted/50 rounded transition-colors text-textTertiary hover:text-textPrimary">
            <Bookmark size={18} />
          </button>
          <button className="p-2 hover:bg-muted/50 rounded transition-colors text-textTertiary hover:text-textPrimary">
            <Grid3x3 size={18} />
          </button>
          <button onClick={() => setIsHotkeysModalOpen(true)} className="p-2 hover:bg-muted/50 rounded transition-colors text-textTertiary hover:text-textPrimary">
            <Keyboard size={18} />
          </button>
          <button onClick={() => setIsAlertsModalOpen(true)} className="p-2 hover:bg-muted/50 rounded transition-colors text-textTertiary hover:text-textPrimary">
            <Volume2 size={18} />
          </button>
          <button onClick={() => setIsSnipeSettingsModalOpen(true)} className="p-2 hover:bg-muted/50 rounded transition-colors text-textTertiary hover:text-textPrimary">
            <Crosshair size={18} />
          </button>
        </div>

        <button 
          ref={walletButtonRef}
          onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
          className="flex items-center gap-2 px-3 py-1.5 bg-muted border border-border rounded-full hover:bg-secondaryStroke transition-colors"
        >
          <Wallet size={16} className="text-textTertiary" />
          <span className="text-sm font-medium text-textSecondary">1</span>
          <span className="text-textTertiary">≡</span>
          <SolIcon width={14} height={14} />
          <span className="text-sm font-medium text-textPrimary">0</span>
          <ChevronDown size={14} className="text-textTertiary" />
        </button>
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
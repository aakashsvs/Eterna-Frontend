"use client"

import React, { useState, useRef } from 'react';
import { Settings, Star, BarChart3, Grid3x3, List, Volume2, HelpCircle, Bookmark, Keyboard, Crosshair, Wallet } from 'lucide-react';
import { MetricsPanel } from './metrics-panel';
import { HelpPopup } from './help-popup';
import { BlacklistModal } from './blacklist-modal';
import { HotkeysModal } from './hotkeys-modal';
import { AlertsModal } from './alerts-modal';
import { SnipeSettingsModal } from './snipe-settings-modal';
import { WalletDropdown } from './wallet-dropdown';

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
        <div className="flex items-center gap-2">
          {/* Help Button */}
          <button
            onClick={() => setIsHelpPopupOpen(!isHelpPopupOpen)}
            className="p-1.5 hover:bg-muted/50 rounded transition-colors"
          >
            <HelpCircle size={16} className="text-muted-foreground" />
          </button>

          {/* Display Button */}
          <button
            onClick={() => setIsMetricsPanelOpen(!isMetricsPanelOpen)}
            className="px-3 py-1.5 text-sm bg-muted/50 border border-border rounded-md text-foreground hover:bg-muted transition-colors flex items-center gap-2"
          >
            <List size={16} />
            Display
            <span className="text-xs">▼</span>
          </button>

          {/* Blacklist Button */}
          <button
            onClick={() => setIsBlacklistModalOpen(true)}
            className="p-1.5 hover:bg-muted/50 rounded transition-colors"
          >
            <Bookmark size={16} className="text-muted-foreground" />
          </button>

          {/* Grid Icon */}
          <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
            <Grid3x3 size={16} className="text-muted-foreground" />
          </button>

          {/* Hotkeys Button */}
          <button
            onClick={() => setIsHotkeysModalOpen(true)}
            className="p-1.5 hover:bg-muted/50 rounded transition-colors"
          >
            <Keyboard size={16} className="text-muted-foreground" />
          </button>

          {/* Alerts Button */}
          <button
            onClick={() => setIsAlertsModalOpen(true)}
            className="p-1.5 hover:bg-muted/50 rounded transition-colors"
          >
            <Volume2 size={16} className="text-muted-foreground" />
          </button>

          {/* Snipe Settings Button */}
          <button
            onClick={() => setIsSnipeSettingsModalOpen(true)}
            className="p-1.5 hover:bg-muted/50 rounded transition-colors"
          >
            <Crosshair size={16} className="text-muted-foreground" />
          </button>

          {/* Wallet Button */}
          <button
            ref={walletButtonRef}
            onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
            className="px-3 py-1.5 text-sm bg-muted/50 border border-border rounded-md text-foreground hover:bg-muted transition-colors flex items-center gap-2"
          >
            <Wallet size={16} />
            <span>1 ≡ 0</span>
            <span className="text-xs">▼</span>
          </button>

          {/* Display info */}
          <div className="text-xs text-muted-foreground px-2">
            1 ≡ 0.436
          </div>
        </div>
      </div>

      <MetricsPanel 
        isOpen={isMetricsPanelOpen} 
        onClose={() => setIsMetricsPanelOpen(false)} 
      />

      <HelpPopup
        isOpen={isHelpPopupOpen}
        onClose={() => setIsHelpPopupOpen(false)}
      />

      <BlacklistModal
        isOpen={isBlacklistModalOpen}
        onClose={() => setIsBlacklistModalOpen(false)}
      />

      <HotkeysModal
        isOpen={isHotkeysModalOpen}
        onClose={() => setIsHotkeysModalOpen(false)}
      />

      <AlertsModal
        isOpen={isAlertsModalOpen}
        onClose={() => setIsAlertsModalOpen(false)}
      />

      <SnipeSettingsModal
        isOpen={isSnipeSettingsModalOpen}
        onClose={() => setIsSnipeSettingsModalOpen(false)}
      />

      <WalletDropdown
        isOpen={isWalletDropdownOpen}
        onClose={() => setIsWalletDropdownOpen(false)}
        triggerRef={walletButtonRef}
      />
    </div>
  );
};


"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Settings, Plus, Copy, Rocket } from 'lucide-react';
import { Button } from '../atoms/button';
import { cn } from '@/lib/utils';

interface WalletDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement>;
}

interface Wallet {
  id: string;
  name: string;
  address: string;
  balance: string;
  isSelected: boolean;
  isActive: boolean;
}

export const WalletDropdown: React.FC<WalletDropdownProps> = ({ isOpen, onClose, triggerRef }) => {
  const [wallets, setWallets] = useState<Wallet[]>([
    {
      id: '1',
      name: 'Axiom Main',
      address: '8xitW...',
      balance: '0',
      isSelected: false,
      isActive: false,
    },
  ]);
  const [selectAll, setSelectAll] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef?.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  const toggleWallet = (id: string) => {
    setWallets(prev =>
      prev.map(wallet =>
        wallet.id === id ? { ...wallet, isSelected: !wallet.isSelected } : wallet
      )
    );
  };

  const toggleWalletActive = (id: string) => {
    setWallets(prev =>
      prev.map(wallet =>
        wallet.id === id ? { ...wallet, isActive: !wallet.isActive } : wallet
      )
    );
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setWallets(prev => prev.map(wallet => ({ ...wallet, isSelected: newSelectAll })));
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        ref={dropdownRef}
        className="absolute right-4 top-16 bg-card border border-border rounded-lg shadow-2xl min-w-[400px] max-w-[450px] pointer-events-auto z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              className={cn(
                selectAll && "bg-muted"
              )}
            >
              {selectAll ? 'Unselect All' : 'Select All with Balance'}
            </Button>
          </div>
          <button className="p-1.5 hover:bg-muted/50 rounded transition-colors">
            <Settings size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Wallet List */}
        <div className="max-h-[400px] overflow-y-auto hide-scrollbar">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              className="p-4 border-b border-border hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <button
                    onClick={() => toggleWallet(wallet.id)}
                    className={cn(
                      "w-5 h-5 rounded border-2 mt-0.5 flex items-center justify-center transition-colors",
                      wallet.isSelected
                        ? "bg-orange-500 border-orange-500"
                        : "border-orange-500/50"
                    )}
                  >
                    {wallet.isSelected && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-orange-400">{wallet.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Rocket size={12} />
                      <span>Off</span>
                      <span className="font-mono">{wallet.address}</span>
                      <button
                        onClick={() => copyAddress(wallet.address)}
                        className="p-0.5 hover:bg-muted/50 rounded"
                      >
                        <Copy size={10} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 bg-gradient-to-br from-purple-500 via-blue-500 to-green-500 rounded"></div>
                    <span className="text-xs text-muted-foreground">≡ {wallet.balance}</span>
                  </div>
                  <button
                    onClick={() => toggleWalletActive(wallet.id)}
                    className={cn(
                      "relative w-10 h-5 rounded-full transition-colors",
                      wallet.isActive ? "bg-purple-500" : "bg-muted"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                        wallet.isActive && "translate-x-5"
                      )}
                    />
                  </button>
                  <span className="text-xs text-muted-foreground min-w-[20px]">{wallet.isActive ? '1' : '0'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Wallet Button */}
        <div className="p-4 border-t border-border">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              // Handle add wallet
            }}
          >
            <Plus size={16} className="mr-2" />
            Add Wallet
          </Button>
        </div>
      </div>
    </div>
  );
};


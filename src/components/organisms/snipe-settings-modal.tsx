"use client"

import React, { useState } from 'react';
import { Button } from '../atoms/button';
import { Dialog, DialogContent } from '../atoms/dialog';
import { cn } from '@/lib/utils';

interface SnipeSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SnipeSettingsModal: React.FC<SnipeSettingsModalProps> = ({ isOpen, onClose }) => {
  const [autoSnipe, setAutoSnipe] = useState(false);
  const [slippage, setSlippage] = useState('20');
  const [gasLimit, setGasLimit] = useState('');

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] border-border bg-card">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Snipe Settings</h2>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-6">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Auto Snipe</label>
            <button
              onClick={() => setAutoSnipe(!autoSnipe)}
              className={cn(
                "relative w-12 h-6 rounded-full transition-colors",
                autoSnipe ? "bg-purple-500" : "bg-muted"
              )}
            >
              <div
                className={cn(
                  "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                  autoSnipe && "translate-x-6"
                )}
              />
            </button>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Slippage (%)</label>
            <input
              type="text"
              value={slippage}
              onChange={(e) => setSlippage(e.target.value)}
              className="w-full px-3 py-2 bg-muted border border-border rounded-md text-foreground"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Gas Limit (Optional)</label>
            <input
              type="text"
              value={gasLimit}
              onChange={(e) => setGasLimit(e.target.value)}
              placeholder="Auto"
              className="w-full px-3 py-2 bg-muted border border-border rounded-md text-foreground"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4 border-t border-border">
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white"
            onClick={onClose}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};


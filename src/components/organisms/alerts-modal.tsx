"use client"

import React, { useState } from 'react';
import { Button } from '../atoms/button';
import { Dialog, DialogContent } from '../atoms/dialog';
import { cn } from '@/lib/utils';

interface AlertsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertsModal: React.FC<AlertsModalProps> = ({ isOpen, onClose }) => {
  const [soundAlertsEnabled, setSoundAlertsEnabled] = useState(true);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] border-border bg-card">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Alerts</h2>
        </div>

        {/* Content */}
        <div className="space-y-6 mb-6">
          <div>
            <h3 className="text-sm font-semibold mb-4">Sound Alerts</h3>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm">Play sound alerts for Tokens in Pulse</label>
              <button
                onClick={() => setSoundAlertsEnabled(!soundAlertsEnabled)}
                className={cn(
                  "relative w-12 h-6 rounded-full transition-colors",
                  soundAlertsEnabled ? "bg-purple-500" : "bg-muted"
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                    soundAlertsEnabled && "translate-x-6"
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4 border-t border-border">
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white w-full"
            onClick={onClose}
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};


"use client"

import React from 'react';
import { HelpCircle } from 'lucide-react';

interface HelpPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpPopup: React.FC<HelpPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div 
        className="absolute inset-0 pointer-events-auto" 
        onClick={onClose}
      />
      <div 
        className="absolute left-4 top-16 bg-card border border-border rounded-lg shadow-2xl p-4 min-w-[300px] pointer-events-auto z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-foreground flex items-center justify-center flex-shrink-0">
            <HelpCircle size={18} className="text-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              Help with Pulse Filters, Settings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


"use client"

import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { Button } from '../atoms/button';
import { Dialog, DialogContent } from '../atoms/dialog';
import { cn } from '@/lib/utils';

interface BlacklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const filterTabs = ['All', 'Dev', 'CA', 'Keyword', 'Website', 'Twitter'];

export const BlacklistModal: React.FC<BlacklistModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [inputValue, setInputValue] = useState('');
  const [blacklistCount] = useState(0);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto hide-scrollbar border-border bg-card">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Blacklist</h2>
        </div>

        {/* Input and Blacklist Button */}
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter twitter profile, dev address or keyword"
            className="flex-1 px-4 py-2 bg-muted border border-border rounded-md text-foreground placeholder:text-muted-foreground"
          />
          <Button className="bg-purple-500 hover:bg-purple-600 text-white px-6">
            Blacklist
          </Button>
        </div>

        {/* Info Message */}
        <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-md mb-4">
          <Info size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Blacklist all types of metrics!
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto hide-scrollbar pb-2">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors",
                activeTab === tab
                  ? "bg-purple-500 text-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
          <span className="text-muted-foreground ml-2">→</span>
        </div>

        {/* Content Area */}
        <div className="min-h-[300px] bg-muted/30 rounded-md border border-border p-4 mb-4 flex items-center justify-center">
          <p className="text-sm text-muted-foreground">No blacklisted items</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="text-sm text-muted-foreground">
            {blacklistCount} / 1000 blacklists
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-pink-500/10 border-pink-500/50 text-pink-400 hover:bg-pink-500/20">
              Delete All
            </Button>
            <Button variant="outline" size="sm">
              Import
            </Button>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};


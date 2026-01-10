"use client"

import React, { useState } from 'react';
import { X, RefreshCw } from 'lucide-react';
import { Button } from '../atoms/button';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '../atoms/dialog';

interface CustomizeThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const themes = [
  { id: 'dark', name: 'Dark', primaryColor: '#526FFF', preview: 'bg-zinc-900 border-blue-500' },
  { id: 'light', name: 'Light', primaryColor: '#526FFF', preview: 'bg-white border-blue-500' },
  { id: 'dusk', name: 'Dusk', primaryColor: '#526FFF', preview: 'bg-zinc-800 border-blue-500' },
  { id: 'astro', name: 'Astro', primaryColor: '#8b5cf6', preview: 'bg-zinc-900 border-purple-500' },
  { id: 'neo', name: 'Neo', primaryColor: '#22c55e', preview: 'bg-zinc-900 border-green-500' },
  { id: 'crimson', name: 'Crimson', primaryColor: '#ef4444', preview: 'bg-zinc-900 border-red-500' },
  { id: 'stealth-blue', name: 'Stealth Blue', primaryColor: '#06b6d4', preview: 'bg-zinc-900 border-cyan-500' },
  { id: 'orange', name: 'Orange', primaryColor: '#f97316', preview: 'bg-zinc-900 border-orange-500' },
  { id: 'custom', name: 'Custom', primaryColor: '#526FFF', preview: 'bg-zinc-900 border-blue-500' },
];

export const CustomizeThemeModal: React.FC<CustomizeThemeModalProps> = ({ isOpen, onClose }) => {
  const [selectedTheme, setSelectedTheme] = useState('dark');
  const [primaryColor, setPrimaryColor] = useState('#526FFF');

  const selectedThemeData = themes.find(t => t.id === selectedTheme);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] border-border bg-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Customize Theme</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted/50 rounded transition-colors"
          >
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Theme Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all",
                selectedTheme === theme.id
                  ? "border-purple-500 bg-purple-500/10"
                  : "border-border hover:border-purple-500/50"
              )}
            >
              <div className={cn(
                "w-full h-16 rounded border-2 flex items-center justify-center",
                theme.preview
              )}>
                <div className="w-8 h-8 border-2 border-white/20 rounded" />
              </div>
              <span className="text-sm font-medium">{theme.name}</span>
            </button>
          ))}
        </div>

        {/* Primary Color Selector */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block">Primary Color</label>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded border-2 border-border"
              style={{ backgroundColor: primaryColor }}
            />
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="flex-1 px-3 py-2 bg-muted border border-border rounded-md text-foreground font-mono"
              placeholder="#526FFF"
            />
            <button
              onClick={() => setPrimaryColor(selectedThemeData?.primaryColor || '#526FFF')}
              className="p-2 hover:bg-muted/50 rounded transition-colors"
            >
              <RefreshCw size={18} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button variant="outline" size="sm">
              Import
            </Button>
          </div>
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white"
            size="sm"
            onClick={onClose}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};


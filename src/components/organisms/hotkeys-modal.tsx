"use client"

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '../atoms/button';
import { Dialog, DialogContent } from '../atoms/dialog';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

interface HotkeysModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const modifierKeys = ['Shift', 'Ctrl', 'Alt', 'Win'] as const;
const tableCategories = ['New Pairs', 'Final Stretch', 'Migrated'] as const;

export const HotkeysModal: React.FC<HotkeysModalProps> = ({ isOpen, onClose }) => {
  const [hotkeysEnabled, setHotkeysEnabled] = useState(true);
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [pauseKey, setPauseKey] = useState('Space');
  const [tableModifiers, setTableModifiers] = useState({
    'New Pairs': 'Shift' as typeof modifierKeys[number],
    'Final Stretch': 'Ctrl' as typeof modifierKeys[number],
    'Migrated': 'Alt' as typeof modifierKeys[number],
  });
  const [rowKeys, setRowKeys] = useState({ row1: '1', row2: '2' });

  const handleModifierChange = (category: typeof tableCategories[number], key: typeof modifierKeys[number]) => {
    setTableModifiers(prev => ({ ...prev, [category]: key }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto hide-scrollbar border-border bg-card">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Pulse Hotkeys</h2>
        </div>

        {/* Hotkeys Section */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium">Hotkeys</label>
              <p className="text-xs text-muted-foreground mt-1">
                Quick buy tokens with custom hotkeys
              </p>
            </div>
            <button
              onClick={() => setHotkeysEnabled(!hotkeysEnabled)}
              className={cn(
                "relative w-12 h-6 rounded-full transition-colors",
                hotkeysEnabled ? "bg-purple-500" : "bg-muted"
              )}
            >
              <div
                className={cn(
                  "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                  hotkeysEnabled && "translate-x-6"
                )}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Pause live feed on Hover</label>
            <button
              onClick={() => setPauseOnHover(!pauseOnHover)}
              className={cn(
                "relative w-12 h-6 rounded-full transition-colors",
                pauseOnHover ? "bg-purple-500" : "bg-muted"
              )}
            >
              <div
                className={cn(
                  "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                  pauseOnHover && "translate-x-6"
                )}
              />
            </button>
          </div>

          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-md">
            <Info size={16} className="text-muted-foreground flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Combine the Pause + Modifier + Row keys to buy tokens
            </p>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Pause Key</label>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPauseKey('Space')}
            >
              {pauseKey}
            </Button>
          </div>
        </div>

        {/* Table Modifier Keys */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-4">Table Modifier Keys</h3>
          <div className="space-y-4">
            {tableCategories.map((category) => (
              <div key={category}>
                <label className="text-xs text-muted-foreground mb-2 block">{category}</label>
                <div className="flex gap-2">
                  {modifierKeys.map((key) => (
                    <button
                      key={key}
                      onClick={() => handleModifierChange(category, key)}
                      className={cn(
                        "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                        tableModifiers[category] === key
                          ? "bg-purple-500 text-white"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row Keys */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-4">Row Keys</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm">Row 1</label>
              <input
                type="text"
                value={rowKeys.row1}
                onChange={(e) => setRowKeys(prev => ({ ...prev, row1: e.target.value }))}
                className="w-20 px-3 py-2 bg-muted border border-border rounded-md text-foreground text-center"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm">Row 2</label>
              <input
                type="text"
                value={rowKeys.row2}
                onChange={(e) => setRowKeys(prev => ({ ...prev, row2: e.target.value }))}
                className="w-20 px-3 py-2 bg-muted border border-border rounded-md text-foreground text-center"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <Button variant="outline" size="sm" onClick={() => {
            setHotkeysEnabled(true);
            setPauseOnHover(true);
            setPauseKey('Space');
            setTableModifiers({
              'New Pairs': 'Shift',
              'Final Stretch': 'Ctrl',
              'Migrated': 'Alt',
            });
            setRowKeys({ row1: '1', row2: '2' });
          }}>
            <RefreshCw size={16} className="mr-2" />
            Reset
          </Button>
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


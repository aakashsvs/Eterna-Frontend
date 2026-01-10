"use client"

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '../atoms/button';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent } from '../atoms/dialog';
import { TokenStatus } from '@/types/token';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: TokenStatus;
}

const protocols = [
  { id: 'pump', name: 'Pump', icon: '💉', color: 'green' },
  { id: 'bonk', name: 'Bonk', icon: '🔥', color: 'orange' },
  { id: 'bags', name: 'Bags', icon: '🛍️', color: 'green' },
  { id: 'moonshot', name: 'Moonshot', icon: '🌙', color: 'purple' },
  { id: 'heaven', name: 'Heaven', icon: '☁️', color: 'gray' },
  { id: 'sugar', name: 'Sugar', icon: '🧊', color: 'pink' },
  { id: 'believe', name: 'Believe', icon: '🍃', color: 'green' },
  { id: 'jupiter', name: 'Jupiter Studio', icon: '🪐', color: 'gray' },
  { id: 'moonit', name: 'Moonit', icon: '✅', color: 'green' },
  { id: 'boop', name: 'Boop', icon: '🐾', color: 'blue' },
  { id: 'launchlab', name: 'LaunchLab', icon: '🚀', color: 'gray' },
  { id: 'dynamic', name: 'Dynamic BC', icon: '⚡', color: 'red' },
  { id: 'raydium', name: 'Raydium', icon: '✨', color: 'gray' },
  { id: 'meteora', name: 'Meteora AMM', icon: '☄️', color: 'red' },
  { id: 'meteora-v2', name: 'Meteora AMM V2', icon: '☄️', color: 'red' },
  { id: 'pump-amm', name: 'Pump AMM', icon: '💉', color: 'gray' },
  { id: 'orca', name: 'Orca', icon: '🐋', color: 'green' },
];

const statusLabels: Record<TokenStatus, string> = {
  new: 'New Pairs',
  final: 'Final Stretch',
  migrated: 'Migrated',
};

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, onClose, status }) => {
  const [selectedProtocols, setSelectedProtocols] = useState<string[]>([]);
  const [activeSubFilter, setActiveSubFilter] = useState<'audit' | 'metrics' | 'socials' | null>(null);
  const [searchKeywords, setSearchKeywords] = useState('');
  const [excludeKeywords, setExcludeKeywords] = useState('');
  const [minBCurve, setMinBCurve] = useState('');
  const [maxBCurve, setMaxBCurve] = useState('');
  const [twitterReusesMin, setTwitterReusesMin] = useState('');
  const [twitterReusesMax, setTwitterReusesMax] = useState('');
  const [tweetAgeMin, setTweetAgeMin] = useState('');
  const [tweetAgeMax, setTweetAgeMax] = useState('');

  const toggleProtocol = (protocolId: string) => {
    setSelectedProtocols(prev =>
      prev.includes(protocolId)
        ? prev.filter(id => id !== protocolId)
        : [...prev, protocolId]
    );
  };

  const selectAllProtocols = () => {
    if (selectedProtocols.length === protocols.length) {
      setSelectedProtocols([]);
    } else {
      setSelectedProtocols(protocols.map(p => p.id));
    }
  };

  const subFilters = [
    { id: 'audit' as const, label: 'Audit', count: 3 },
    { id: 'metrics' as const, label: '$ Metrics', count: 1 },
    { id: 'socials' as const, label: 'Socials', count: 2 },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto hide-scrollbar border-border bg-card">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-border pr-8">
          <div className="flex items-center gap-4">
            <button className={cn(
              "px-4 py-2 text-sm font-medium border-b-2",
              "border-purple-500 text-purple-400"
            )}>
              {statusLabels[status]} ⑦
            </button>
            <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
              Final Stretch ⑤
            </button>
            <button className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground">
              Migrated ⑧
            </button>
          </div>
          <button className="p-2 hover:bg-muted/50 rounded transition-colors">
            <RefreshCw size={18} className="text-muted-foreground" />
          </button>
        </div>

        {/* Protocols Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">Protocols</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={selectAllProtocols}
            >
              Select All
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {protocols.map((protocol) => {
              const isSelected = selectedProtocols.includes(protocol.id);
              return (
                <button
                  key={protocol.id}
                  onClick={() => toggleProtocol(protocol.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md border-2 transition-all text-sm",
                    isSelected
                      ? protocol.color === 'green' ? "border-green-500 bg-green-500/10" :
                        protocol.color === 'orange' ? "border-orange-500 bg-orange-500/10" :
                        protocol.color === 'purple' ? "border-purple-500 bg-purple-500/10" :
                        protocol.color === 'pink' ? "border-pink-500 bg-pink-500/10" :
                        protocol.color === 'blue' ? "border-blue-500 bg-blue-500/10" :
                        protocol.color === 'red' ? "border-red-500 bg-red-500/10" :
                        "border-muted-foreground bg-muted"
                      : "border-border hover:border-purple-500/50"
                  )}
                >
                  <span>{protocol.icon}</span>
                  <span className="truncate">{protocol.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Keyword Search */}
        <div className="mb-6 space-y-3">
          <div>
            <label className="text-sm font-medium mb-1 block">Search Keywords</label>
            <input
              type="text"
              value={searchKeywords}
              onChange={(e) => setSearchKeywords(e.target.value)}
              placeholder="keyword1, keyword2..."
              className="w-full px-3 py-2 bg-muted border border-border rounded-md text-foreground"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">Exclude Keywords</label>
            <input
              type="text"
              value={excludeKeywords}
              onChange={(e) => setExcludeKeywords(e.target.value)}
              placeholder="keyword1, keyword2..."
              className="w-full px-3 py-2 bg-muted border border-border rounded-md text-foreground"
            />
          </div>
        </div>

        {/* B. curve % */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3">B. curve %</h3>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">Min</label>
              <input
                type="number"
                value={minBCurve}
                onChange={(e) => setMinBCurve(e.target.value)}
                className="w-full px-3 py-2 bg-muted border border-border rounded-md text-foreground"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground mb-1 block">Max</label>
              <input
                type="number"
                value={maxBCurve}
                onChange={(e) => setMaxBCurve(e.target.value)}
                className="w-full px-3 py-2 bg-muted border border-border rounded-md text-foreground"
              />
            </div>
          </div>
        </div>

        {/* Sub-Filter Tabs */}
        <div className="flex gap-2 mb-4">
          {subFilters.map((filter) => {
            const isActive = activeSubFilter === filter.id;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveSubFilter(isActive ? null : filter.id)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-purple-500 text-white"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                {filter.label} {filter.count > 0 && `②`}
              </button>
            );
          })}
        </div>

        {/* Socials Filter Content */}
        {activeSubFilter === 'socials' && (
          <div className="mb-6 space-y-4 p-4 bg-muted/30 rounded-md">
            <div>
              <label className="text-sm font-medium mb-2 block">Twitter Reuses</label>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <input
                    type="number"
                    value={twitterReusesMin}
                    onChange={(e) => setTwitterReusesMin(e.target.value)}
                    placeholder="Min"
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="number"
                    value={twitterReusesMax}
                    onChange={(e) => setTwitterReusesMax(e.target.value)}
                    placeholder="Max"
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Tweet Age</label>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <input
                    type="number"
                    value={tweetAgeMin}
                    onChange={(e) => setTweetAgeMin(e.target.value)}
                    placeholder="Min"
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground"
                  />
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    type="number"
                    value={tweetAgeMax}
                    onChange={(e) => setTweetAgeMax(e.target.value)}
                    placeholder="Max"
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-md text-foreground"
                  />
                  <select className="px-3 py-2 bg-background border border-border rounded-md text-foreground">
                    <option>m</option>
                    <option>h</option>
                    <option>d</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Import
            </Button>
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white"
            size="sm"
            onClick={onClose}
          >
            Apply All
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};


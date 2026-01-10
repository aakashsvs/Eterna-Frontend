"use client"

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../atoms/button';
import { cn } from '@/lib/utils';

interface MetricsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'layout' | 'metrics' | 'row' | 'extras'>('layout');
  const [metricSize, setMetricSize] = useState<'small' | 'large'>('small');
  const [quickBuy, setQuickBuy] = useState<'small' | 'large' | 'mega' | 'ultra'>('large');
  const [greyTheme, setGreyTheme] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [noDecimals, setNoDecimals] = useState(false);
  const [showHiddenTokens, setShowHiddenTokens] = useState(false);
  const [unhideOnMigrated, setUnhideOnMigrated] = useState(false);
  const [circleImages, setCircleImages] = useState(false);
  const [progressRing, setProgressRing] = useState(false);
  const [spacedTables, setSpacedTables] = useState(false);

  if (!isOpen) return null;

  const tabs = [
    { id: 'layout' as const, label: 'Layout' },
    { id: 'metrics' as const, label: 'Metrics' },
    { id: 'row' as const, label: 'Row' },
    { id: 'extras' as const, label: 'Extras' },
  ];

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute inset-0 bg-background/50 backdrop-blur-sm pointer-events-auto" onClick={onClose} />
      <div className="absolute right-0 top-0 bottom-0 w-80 bg-card border-l border-border shadow-2xl pointer-events-auto overflow-y-auto hide-scrollbar">
        <div className="p-4 border-b border-border sticky top-0 bg-card z-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Metrics</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted/50 rounded transition-colors"
            >
              <X size={18} className="text-muted-foreground" />
            </button>
          </div>

          {/* Metric Size Selector */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={metricSize === 'small' ? 'default' : 'outline'}
              size="sm"
              className={cn(
                "flex-1",
                metricSize === 'small' && "bg-purple-500 hover:bg-purple-600"
              )}
              onClick={() => setMetricSize('small')}
            >
              MC 77K Small
            </Button>
            <Button
              variant={metricSize === 'large' ? 'default' : 'outline'}
              size="sm"
              className={cn(
                "flex-1",
                metricSize === 'large' && "bg-purple-500 hover:bg-purple-600"
              )}
              onClick={() => setMetricSize('large')}
            >
              MC 77K Large
            </Button>
          </div>

          {/* Quick Buy Section */}
          <div className="flex gap-2 mb-4">
            {(['small', 'large', 'mega', 'ultra'] as const).map((size) => (
              <Button
                key={size}
                variant={quickBuy === size ? 'default' : 'outline'}
                size="sm"
                className={cn(
                  "flex-1 text-xs capitalize",
                  quickBuy === size && "bg-purple-500 hover:bg-purple-600"
                )}
                onClick={() => setQuickBuy(size)}
              >
                {size}
              </Button>
            ))}
          </div>

          {/* Grey Toggle */}
          <div className="flex items-center justify-between mb-4 p-2 bg-muted/30 rounded-md">
            <span className="text-sm">Grey</span>
            <button
              onClick={() => setGreyTheme(!greyTheme)}
              className={cn(
                "relative w-10 h-6 rounded-full transition-colors",
                greyTheme ? "bg-purple-500" : "bg-muted"
              )}
            >
              <div
                className={cn(
                  "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                  greyTheme && "translate-x-4"
                )}
              />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 px-4 py-2 text-sm font-medium transition-colors border-b-2",
                activeTab === tab.id
                  ? "border-purple-500 text-purple-400"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4 space-y-4">
          {activeTab === 'layout' && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-sm">Show Search Bar</span>
                <button
                  onClick={() => setShowSearchBar(!showSearchBar)}
                  className={cn(
                    "relative w-10 h-6 rounded-full transition-colors",
                    showSearchBar ? "bg-purple-500" : "bg-muted"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                      showSearchBar && "translate-x-4"
                    )}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm"># No Decimals</span>
                <button
                  onClick={() => setNoDecimals(!noDecimals)}
                  className={cn(
                    "relative w-10 h-6 rounded-full transition-colors",
                    noDecimals ? "bg-purple-500" : "bg-muted"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                      noDecimals && "translate-x-4"
                    )}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Show Hidden Tokens</span>
                <button
                  onClick={() => setShowHiddenTokens(!showHiddenTokens)}
                  className={cn(
                    "relative w-10 h-6 rounded-full transition-colors",
                    showHiddenTokens ? "bg-purple-500" : "bg-muted"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                      showHiddenTokens && "translate-x-4"
                    )}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm">Unhide on Migrated</span>
                <button
                  onClick={() => setUnhideOnMigrated(!unhideOnMigrated)}
                  className={cn(
                    "relative w-10 h-6 rounded-full transition-colors",
                    unhideOnMigrated ? "bg-purple-500" : "bg-muted"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform",
                      unhideOnMigrated && "translate-x-4"
                    )}
                  />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={circleImages}
                    onChange={(e) => setCircleImages(e.target.checked)}
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className="text-sm">Circle Images</span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={progressRing}
                    onChange={(e) => setProgressRing(e.target.checked)}
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className="text-sm">Progress Ring</span>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={spacedTables}
                    onChange={(e) => setSpacedTables(e.target.checked)}
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className="text-sm">Spaced Tables</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground">Customize rows</p>
              </div>
            </>
          )}

          {activeTab === 'metrics' && (
            <div className="text-sm text-muted-foreground">
              Metrics configuration coming soon...
            </div>
          )}

          {activeTab === 'row' && (
            <div className="text-sm text-muted-foreground">
              Row configuration coming soon...
            </div>
          )}

          {activeTab === 'extras' && (
            <div className="text-sm text-muted-foreground">
              Extra settings coming soon...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


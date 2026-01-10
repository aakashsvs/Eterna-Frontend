import { TokenTable } from "@/components/organisms/token-table";
import { TopNavbar } from "@/components/organisms/top-navbar";
import { BottomStatusBar } from "@/components/organisms/bottom-status-bar";
import { PulseHeader } from "@/components/organisms/pulse-header";
import { Settings, Star, LineChart } from 'lucide-react';

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-screen bg-background overflow-hidden text-textPrimary">
      {/* Top Navigation Bar */}
      <TopNavbar />

      {/* Ticker Bar */}
      <div className="hidden sm:block">
        <div className="grayscale-[30%] hover:grayscale-0 transition-[filter] relative flex flex-row w-full h-[28px] gap-[8px] px-[16px] pb-[1px] overflow-hidden border-b border-primaryStroke sm:border-primaryStroke/50">
          <div className="flex flex-row h-full items-center z-20 gap-[8px]">
            <button type="button" className="min-w-[24px] min-h-[24px] flex items-center justify-center text-textTertiary hover:text-textSecondary hover:bg-primaryStroke/60 transition-colors duration-125 ease-in-out rounded-[4px]">
              <Settings size={14} />
            </button>
          </div>
          <div className="flex flex-row h-full items-center z-20 gap-[8px]">
            <div className="w-[1px] h-[16px] bg-primaryStroke"></div>
          </div>
          <div className="flex flex-row h-full items-center z-20 gap-[8px]">
            <button type="button" className="min-w-[24px] min-h-[24px] flex items-center justify-center text-textSecondary hover:text-textSecondary hover:bg-primaryStroke/60 transition-colors duration-125 ease-in-out rounded-[4px]">
              <Star size={14} />
            </button>
            <button type="button" className="min-w-[24px] min-h-[24px] flex items-center justify-center text-textTertiary hover:text-textSecondary hover:bg-primaryStroke/60 transition-colors duration-125 ease-in-out rounded-[4px]">
              <LineChart size={14} />
            </button>
          </div>
          <div className="flex flex-row h-full items-center z-20 gap-[8px]">
            <div className="w-[1px] h-[16px] bg-primaryStroke"></div>
          </div>
          <div className="flex flex-row justify-start items-center flex-1 overflow-hidden show-bins-container duration-150 ease-in-out">
            <div className="h-full flex flex-row gap-[1px] pt-[1px] items-center overflow-x-auto ticker-scroll-container hide-scrollbar animate-ticker">
              <div style={{ width: '0px', height: '100%', position: 'relative', display: 'flex' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden p-4">
        {/* Pulse Header */}
        <PulseHeader />
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden relative">
          <TokenTable />
        </div>
      </div>
      
      {/* Bottom Status Bar */}
      <BottomStatusBar />
    </main>
  );
}

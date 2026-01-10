import { TokenTable } from "@/components/organisms/token-table";
import { TopNavbar } from "@/components/organisms/top-navbar";
import { BottomStatusBar } from "@/components/organisms/bottom-status-bar";
import { PulseHeader } from "@/components/organisms/pulse-header";

export default function Home() {
  return (
    <main className="flex flex-col h-screen w-screen bg-background overflow-hidden text-textPrimary">
      {/* Top Navigation Bar */}
      <TopNavbar />
      
      {/* Pulse Header */}
      <PulseHeader />
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <TokenTable />
      </div>
      
      {/* Bottom Status Bar */}
      <BottomStatusBar />
    </main>
  );
}

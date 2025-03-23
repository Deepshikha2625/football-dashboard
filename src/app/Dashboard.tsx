"use client";
import { useState } from "react";
import TrendingNews from "@/components/TrendingNews";
import { Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import MatchCards from "@/components/MatchCards";

export default function Dashboard() {
    const [darkMode, setDarkMode] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className={`flex h-screen font-['Sofia_Sans'] ${darkMode ? "bg-black text-white" : "bg-[#222222] text-white"}`}>
            {/* Sidebar (Hidden on Small Screens) */}
            <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">
                {/* Mobile Sidebar Toggle */}
                <button className="lg:hidden mb-4 text-[#C3CC5A]" onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <Menu size={28} />
                </button>

                {/* Banner & Trending News - Same Row (Responsive) */}
                <div className="grid grid-cols-3 gap-4">
                    {/* Match Dashboard (Wider Section) */}
                    <div className="bg-[#303030] p-4 rounded-lg shadow-lg col-span-2">
                        
                        <MatchCards />
                    </div>

                    {/* Trending News (Smaller Section) */}
                    <div className="bg-[#303030] p-4 rounded-lg shadow-lg col-span-1">
                        <TrendingNews />
                    </div>
                </div>
            </main>
        </div>
    );
}

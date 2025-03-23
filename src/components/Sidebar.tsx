"use client";
import { Home, Trophy, MessageCircle, Bell, Shield, User, Download, Settings, Sun, Moon, LogOut, X, Search } from "lucide-react";
import clsx from "clsx";
import { Button } from "./ui/button";
import { MenuItemProps, SidebarProps } from "@/helper/Interfaces";

export default function Sidebar({ darkMode, setDarkMode, sidebarOpen, setSidebarOpen }: SidebarProps) {
    return (
        <aside className={clsx(
            "fixed lg:static left-0 top-0 w-64 h-full bg-[#222222] p-4 transform transition-transform duration-300",
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}>
            {/* Close Button (Mobile) */}
            <button className="lg:hidden text-[#C3CC5A] mb-4" onClick={() => setSidebarOpen(false)}>
                <X size={28} />
            </button>

            <h1 className="text-xl font-bold text-white">FOOTBALL<span className=" text-[#C3CC5A]">SHURU</span></h1>
            <div className="flex flex-grow items-center bg-[#303030] p-2  rounded-md mt-3">
                <Search size={18} className="text-white" />
                <input type="text" placeholder="Search For Matches" className="ml-2 w-full bg-transparent outline-none" />
            </div>
            {/* Navigation */}
            <nav className="mt-4 space-y-4">
                <MenuItem icon={<Home size={20} />} label="Home" active />
                <MenuItem icon={<Trophy size={20} />} label="Leader Board" />
                <MenuItem icon={<MessageCircle size={20} />} label="Chat" />
                <MenuItem icon={<Bell size={20} />} label="Notification" />
                <hr className="border-[#303030]" />
                <MenuItem icon={<Shield size={20} />} label="Followed Team" />
                <MenuItem icon={<User size={20} />} label="Followed Players" />
                <hr className="border-[#303030]" />
                <MenuItem icon={<Settings size={20} />} label="Settings" />
                <MenuItem icon={<Download size={20} />} label="Download The App" />
            </nav>

            <div className="flex items-center justify-between bg-[#303030] p-2 rounded-md">
                <Button onClick={() => setDarkMode(false)} className={clsx("flex-1 p-2", !darkMode && "bg-[#C3CC5A] text-black")}>
                    <Sun size={16} className="mr-1" /> Light
                </Button>
                <Button onClick={() => setDarkMode(true)} className={clsx("flex-1 p-2", darkMode && "bg-[#C3CC5A] text-black")}>
                    <Moon size={16} className="mr-1" /> Dark
                </Button>
            </div>
            <div className="flex items-center bg-[#303030] p-3 rounded-md mt-4">
                <div className="w-10 h-10 bg-[#C3CC5A] rounded-full flex items-center justify-center text-black font-bold">V</div>
                <div className="ml-3">
                    <p className="text-sm font-semibold">Varun_kubal</p>
                    <p className="text-xs text-gray-400">varun_kubal@email.com</p>
                </div>
                <LogOut size={20} className="ml-auto text-[#C3CC5A]" />
            </div>

        </aside>
    );
}

function MenuItem({ icon, label, active = false }: MenuItemProps) {
    return (
        <div className={clsx("flex items-center p-2 rounded-md cursor-pointer", active ? "bg-[#C3CC5A] text-black" : "")}>
            {icon}
            <span className="ml-3">{label}</span>
        </div>
    );
}

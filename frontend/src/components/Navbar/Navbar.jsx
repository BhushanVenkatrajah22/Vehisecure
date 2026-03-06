import React from 'react';
import { Search, Bell, Settings, Zap } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="h-24 vibrant-glass flex flex-shrink-0 items-center justify-between px-8 z-20 sticky top-0">

            {/* Decorative Top Highlight */}
            <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-neonPink via-neonCyan to-neonYellow opacity-50 rounded-full"></div>

            {/* Vibrant Colorful Search Bar */}
            <div className="relative group w-full max-w-md hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search size={20} className="text-white/50 group-focus-within:text-neonCyan transition-colors" />
                </div>
                <input
                    type="text"
                    className="w-full bg-black/20 backdrop-blur-md border border-white/10 text-white rounded-full py-3.5 pl-12 pr-4 focus:outline-none focus:border-neonCyan focus:bg-black/40 focus:ring-4 focus:ring-neonCyan/20 transition-all font-medium placeholder:text-white/40 shadow-inner"
                    placeholder="Search vehicles, owners, policies..."
                />
                <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                    <button className="bg-white/10 hover:bg-white/20 p-1.5 rounded-full text-white/70 transition-colors">
                        <Zap size={16} className="text-neonYellow" />
                    </button>
                </div>
            </div>

            <div className="flex-1 md:hidden"></div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
                <button className="relative p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group">
                    <Bell size={22} className="text-white/70 group-hover:text-neonPink transition-colors" />
                    <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-neonPink rounded-full shadow-[0_0_8px_#FF007F] animate-bounce"></span>
                </button>
                <button className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group">
                    <Settings size={22} className="text-white/70 group-hover:text-neonCyan transition-colors" />
                </button>

                {/* Status indicator */}
                <div className="hidden lg:flex ml-4 items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-neonCyan/20 to-blue-500/20 border border-neonCyan/30 text-white font-bold text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-neonCyan shadow-[0_0_10px_#00F3FF] animate-pulse"></span>
                    System Active
                </div>
            </div>
        </header>
    );
};

export default Navbar;

import React from 'react';
import { Bell, Search, Settings } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="h-16 bg-card border-b border-cardBorder flex items-center justify-between px-8 z-10 sticky top-0">

            {/* Search Bar */}
            <div className="relative group w-96 hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={16} className="text-textMuted group-focus-within:text-primary transition-colors" />
                </div>
                <input
                    type="text"
                    className="bg-[#1F2937] border-transparent text-textMain text-sm rounded-md focus:ring-1 focus:ring-primary focus:border-primary block w-full pl-10 p-2 transition-all outline-none placeholder:text-textMuted placeholder:font-light"
                    placeholder="Search vehicles, owners, policies..."
                />
            </div>

            <div className="flex-1 md:hidden"></div> {/* Spacer for mobile */}

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
                <button className="p-2 text-textMuted hover:text-textMain transition-colors rounded-full hover:bg-[#1F2937] relative">
                    <Bell size={18} />
                    <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                </button>
                <button className="p-2 text-textMuted hover:text-textMain transition-colors rounded-full hover:bg-[#1F2937]">
                    <Settings size={18} />
                </button>
            </div>
        </header>
    );
};

export default Navbar;

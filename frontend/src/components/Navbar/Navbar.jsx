import React from 'react';
import { Bell, Search, UserCircle } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="h-20 glass-card mx-6 mt-4 border border-glassBorder/50 rounded-2xl flex items-center justify-between px-6 z-20 backdrop-blur-xl">

            {/* Search Bar Placeholder */}
            <div className="relative group w-96 hidden md:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400 group-focus-within:text-neonCyan transition-colors" />
                </div>
                <input
                    type="text"
                    className="bg-deepBlue/40 border border-gray-700/50 text-white text-sm rounded-xl focus:ring-1 focus:ring-neonCyan focus:border-neonCyan block w-full pl-10 p-2.5 transition-all outline-none placeholder-gray-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]"
                    placeholder="Global search VIN, Plate, Owner..."
                />
            </div>

            <div className="flex-1 md:hidden"></div> {/* Spacer for mobile */}

            {/* Right Side Icons */}
            <div className="flex items-center space-x-6">
                <button className="relative p-2 text-gray-400 hover:text-neonCyan transition-colors rounded-full hover:bg-glassBg/50">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center space-x-3 border-l border-glassBorder/40 pl-6 cursor-pointer group">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-white group-hover:text-neonCyan transition-colors">Admin Prime</p>
                        <p className="text-xs text-gray-400">System Operator</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-electricBlue shadow-[0_0_10px_rgba(0,82,255,0.4)] flex items-center justify-center overflow-hidden bg-deepBlue">
                        <UserCircle size={24} className="text-electricBlue group-hover:text-neonCyan transition-colors" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

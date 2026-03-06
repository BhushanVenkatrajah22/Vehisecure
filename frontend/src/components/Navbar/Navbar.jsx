import React from 'react';
import { Terminal, Cpu } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="h-20 cyber-panel mx-8 mt-6 flex items-center justify-between px-8 z-20 sticky top-4 border-t-2 border-t-cyberBlue">

            {/* Decorative Network Path */}
            <div className="absolute -bottom-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-cyberBlue to-transparent opacity-50"></div>

            {/* Terminal Input Stylized Search */}
            <div className="relative group w-[500px] hidden md:flex items-center">
                <Terminal size={18} className="text-cyberBlue mr-3" />
                <span className="text-cyberBlue font-mono font-bold mr-2">{'>'}</span>
                <input
                    type="text"
                    className="bg-transparent border-none text-white font-mono text-sm focus:ring-0 block w-full outline-none placeholder:text-slate-600 tracking-wider"
                    placeholder="ENTER QUERY DIRECTIVE..."
                />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-slate-700 group-focus-within:bg-cyberBlue transition-colors duration-300"></div>
            </div>

            <div className="flex-1 md:hidden"></div> {/* Spacer for mobile */}

            {/* Right Side Readouts */}
            <div className="flex items-center gap-6">
                <div className="hidden lg:flex items-center gap-4 font-mono text-xs border-r border-slate-700 pr-6">
                    <div className="flex flex-col items-end">
                        <span className="text-slate-500">CPU LOAD</span>
                        <span className="text-neonGreen">14.2%</span>
                    </div>
                    <Cpu size={24} className="text-slate-400" />
                    <div className="flex flex-col items-start">
                        <span className="text-slate-500">NET T/R</span>
                        <span className="text-cyberBlue">1.2 GB/s</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-sm border border-cyberBlue/30 px-3 py-1.5 rounded-md bg-cyberBlue/10 text-cyberBlue shadow-[0_0_10px_rgba(0,240,255,0.2)]">
                    <span className="w-2 h-2 bg-cyberBlue rounded-full animate-ping"></span>
                    SYS.SECURE
                </div>
            </div>
        </header>
    );
};

export default Navbar;

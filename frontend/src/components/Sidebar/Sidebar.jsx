import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Car, Users, ShieldCheck, Link as LinkIcon, ScanFace, Activity } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { name: 'Core Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
        { name: 'Asset DB', path: '/vehicles', icon: <Car size={20} /> },
        { name: 'Personnel DB', path: '/owners', icon: <Users size={20} /> },
        { name: 'Security Policies', path: '/insurance', icon: <ShieldCheck size={20} /> },
        { name: 'Data Linkage', path: '/link', icon: <LinkIcon size={20} /> },
        { name: 'Identity Scanner', path: '/verify', icon: <ScanFace size={20} /> },
    ];

    return (
        <aside className="w-72 h-full bg-slate-900/40 backdrop-blur-3xl border-r border-cyberBlue/20 flex flex-col z-20 shadow-[5px_0_30px_rgba(0,240,255,0.05)] relative">
            {/* Edge highlight */}
            <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyberBlue/50 to-transparent"></div>

            <div className="h-24 flex items-center justify-center border-b border-slate-700/50 relative overflow-hidden group">
                <div className="absolute inset-0 bg-cyberBlue/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                <div className="flex items-center gap-3 relative z-10">
                    <Activity className="text-cyberBlue animate-pulse" size={28} />
                    <h1 className="text-2xl font-black font-mono tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-cyberBlue to-deepPurple drop-shadow-[0_0_10px_rgba(0,240,255,0.8)]">
                        NEXUS
                    </h1>
                </div>
            </div>

            <nav className="flex-1 px-4 py-8 space-y-3 overflow-y-auto">
                <div className="mb-4 text-xs font-mono text-cyberBlue/60 tracking-widest pl-2">SYSTEM MODULES</div>

                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center space-x-4 px-4 py-3.5 rounded-xl transition-all duration-300 relative overflow-hidden group font-mono text-sm tracking-wider ${isActive
                                ? 'bg-cyberBlue/10 text-cyberBlue border border-cyberBlue/30 shadow-[inset_0_0_20px_rgba(0,240,255,0.1)]'
                                : 'text-slate-400 border border-transparent hover:border-slate-700 hover:text-white hover:bg-slate-800/50'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-cyberBlue shadow-[0_0_10px_#00F0FF]"></span>
                                )}

                                {/* Hover scanline effect inside button */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyberBlue/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scanline pointer-events-none"></div>

                                <span className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]' : 'group-hover:text-cyberBlue group-hover:scale-110'}`}>
                                    {item.icon}
                                </span>
                                <span className="relative z-10">{item.name}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-6 border-t border-slate-700/50 flex flex-col gap-2 relative">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-cyberBlue/10 border border-cyberBlue flex items-center justify-center shadow-glow-cyan">
                        <span className="font-mono font-bold text-cyberBlue">OP</span>
                    </div>
                    <div>
                        <p className="text-sm font-mono font-bold text-white tracking-wider">OPERATOR_01</p>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 rounded-full bg-neonGreen animate-pulse"></span>
                            <span className="text-xs text-neonGreen font-mono">SYS.ONLINE</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

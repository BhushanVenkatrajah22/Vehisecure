import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Car, Users, ShieldCheck, Link as LinkIcon, ScanFace, Sparkles } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={22} />, color: 'group-hover:text-neonPink' },
        { name: 'Vehicles', path: '/vehicles', icon: <Car size={22} />, color: 'group-hover:text-neonCyan' },
        { name: 'Owners', path: '/owners', icon: <Users size={22} />, color: 'group-hover:text-neonYellow' },
        { name: 'Insurance', path: '/insurance', icon: <ShieldCheck size={22} />, color: 'group-hover:text-neonPurple' },
        { name: 'Link Data', path: '/link', icon: <LinkIcon size={22} />, color: 'group-hover:text-pink-400' },
        { name: 'Verify ID', path: '/verify', icon: <ScanFace size={22} />, color: 'group-hover:text-yellow-400' },
    ];

    return (
        <aside className="h-full vibrant-glass flex flex-col relative overflow-hidden group/sidebar">
            {/* Decorative inner glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-3xl"></div>

            <div className="h-28 flex items-center justify-center border-b border-white/10 relative z-10">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Sparkles className="text-neonYellow animate-spin-slow absolute -top-4 -right-4" size={20} />
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-neonPink to-neonPurple flex items-center justify-center shadow-[0_0_20px_rgba(255,0,127,0.5)]">
                            <Car className="text-white" size={24} />
                        </div>
                    </div>
                    <h1 className="text-3xl tracking-tight text-gradient-primary">
                        VehiSync
                    </h1>
                </div>
            </div>

            <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto relative z-10">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group font-display font-bold text-[15px] ${isActive
                                ? 'bg-white/10 text-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] border border-white/20'
                                : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <div className={`p-2 rounded-xl transition-colors duration-300 ${isActive ? 'bg-gradient-to-br from-neonCyan to-blue-500 shadow-[0_0_15px_rgba(0,243,255,0.4)] text-white' : `bg-white/5 text-white/50 ${item.color}`}`}>
                                    {item.icon}
                                </div>
                                <span className="relative">
                                    {item.name}
                                    {isActive && (
                                        <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-neonCyan to-transparent rounded-full"></span>
                                    )}
                                </span>
                                {isActive && (
                                    <motion.div layoutId="sidebar-active" className="absolute right-4 w-2 h-2 rounded-full bg-neonPink shadow-[0_0_10px_#FF007F]" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-6 m-4 vibrant-glass bg-white/5 border border-white/10 relative overflow-hidden group relative z-10">
                <div className="absolute inset-0 bg-gradient-to-r from-neonPurple/20 to-neonPink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="flex items-center gap-4 relative z-10">
                    <img src="https://ui-avatars.com/api/?name=Admin+User&background=FF007F&color=fff&rounded=true&bold=true" alt="User" className="w-12 h-12 rounded-full border-2 border-neonPink shadow-[0_0_15px_rgba(255,0,127,0.4)]" />
                    <div>
                        <p className="font-display font-bold text-white leading-tight">Admin User</p>
                        <p className="text-xs text-neonYellow font-semibold flex items-center gap-1 mt-1">
                            <span className="w-2 h-2 rounded-full bg-neonYellow animate-pulse"></span>
                            Online
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

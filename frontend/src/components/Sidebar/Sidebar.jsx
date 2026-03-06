import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Car, Users, ShieldCheck, Link as LinkIcon, CheckCircle } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
        { name: 'Vehicles', path: '/vehicles', icon: <Car size={20} /> },
        { name: 'Owners', path: '/owners', icon: <Users size={20} /> },
        { name: 'Insurance', path: '/insurance', icon: <ShieldCheck size={20} /> },
        { name: 'Link Entities', path: '/link', icon: <LinkIcon size={20} /> },
        { name: 'Verification Phase', path: '/verify', icon: <CheckCircle size={20} /> },
    ];

    return (
        <aside className="w-64 h-full glass-card border-l-0 border-y-0 border-r-glassBorder/50 flex flex-col z-20">
            <div className="p-6 flex items-center justify-center border-b border-glassBorder/30">
                <h1 className="text-2xl font-black tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-neonCyan to-electricBlue filter drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
                    VEHISECURE
                </h1>
            </div>

            <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 relative overflow-hidden group ${isActive
                                ? 'bg-electricBlue/20 text-neonCyan shadow-[inset_0_0_10px_rgba(0,240,255,0.1)]'
                                : 'text-gray-400 hover:text-white hover:bg-glassBg/50'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                {isActive && (
                                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-neonCyan shadow-[0_0_10px_#00F0FF] rounded-r-md"></span>
                                )}
                                <span className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                    {item.icon}
                                </span>
                                <span className="font-medium tracking-wide">{item.name}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-glassBorder/30 text-xs text-center text-gray-500">
                v1.0.0 Operator Access
            </div>
        </aside>
    );
};

export default Sidebar;

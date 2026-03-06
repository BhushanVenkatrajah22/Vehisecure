import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Car, Users, ShieldCheck, Link as LinkIcon, CheckCircle } from 'lucide-react';

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={18} /> },
        { name: 'Vehicles', path: '/vehicles', icon: <Car size={18} /> },
        { name: 'Owners', path: '/owners', icon: <Users size={18} /> },
        { name: 'Insurance', path: '/insurance', icon: <ShieldCheck size={18} /> },
        { name: 'Entity Links', path: '/link', icon: <LinkIcon size={18} /> },
        { name: 'Verification', path: '/verify', icon: <CheckCircle size={18} /> },
    ];

    return (
        <aside className="w-64 h-full bg-card border-r border-cardBorder flex flex-col z-20">
            <div className="h-16 flex items-center px-6 border-b border-cardBorder">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mr-3">
                    <ShieldCheck size={20} className="text-white" />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white">
                    VehiSecure
                </h1>
            </div>

            <div className="px-4 py-3">
                <p className="text-xs font-semibold text-textMuted uppercase tracking-wider mb-2 mt-4 ml-2">Main Menu</p>
            </div>

            <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${isActive
                                ? 'bg-primary/10 text-primary'
                                : 'text-textMuted hover:text-textMain hover:bg-[#1F2937]'
                            }`
                        }
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-cardBorder flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-sm font-medium">A</div>
                <div>
                    <p className="text-sm font-medium text-textMain">Admin User</p>
                    <p className="text-xs text-textMuted">admin@vehisecure.com</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

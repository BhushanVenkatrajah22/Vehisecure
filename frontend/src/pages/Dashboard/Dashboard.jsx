import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Shield, Radio, ShieldAlert, Zap, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const [stats,setStats] = useState({
        totalVehicles: 0,
        totalOwners: 0,
        activeInsurance: 0,
        unauthorized: 0
    });

    useEffect(() => {
        // Fast counting animation
        let current = { v: 0, o: 0, i: 0, u: 0 };
        const target = { v: 2408, o: 1592, i: 2011, u: 48 };

        const interval = setInterval(() => {
            current.v += Math.floor((target.v - current.v) * 0.1) || 1;
            current.o += Math.floor((target.o - current.o) * 0.1) || 1;
            current.i += Math.floor((target.i - current.i) * 0.1) || 1;
            current.u += Math.floor((target.u - current.u) * 0.1) || 1;

            if (current.v >= target.v) {
                clearInterval(interval);
                setStats({ totalVehicles: target.v, totalOwners: target.o, activeInsurance: target.i, unauthorized: target.u });
            } else {
                setStats({ totalVehicles: current.v, totalOwners: current.o, activeInsurance: current.i, unauthorized: current.u });
            }
        }, 40);

        return () => clearInterval(interval);
    }, []);

    const statCards = [
        { title: 'Total Vehicles', value: stats.totalVehicles, icon: <Database size={32} />, color: 'from-neonCyan to-blue-500', glow: 'shadow-[0_0_20px_rgba(0,243,255,0.4)]', text: 'text-neonCyan' },
        { title: 'Registered Owners', value: stats.totalOwners, icon: <Radio size={32} />, color: 'from-neonPurple to-fuchsia-500', glow: 'shadow-[0_0_20px_rgba(176,38,255,0.4)]', text: 'text-neonPurple' },
        { title: 'Active Insurance', value: stats.activeInsurance, icon: <Shield size={32} />, color: 'from-neonYellow to-orange-500', glow: 'shadow-[0_0_20px_rgba(251,255,0,0.4)]', text: 'text-neonYellow' },
        { title: 'Security Alerts', value: stats.unauthorized, icon: <ShieldAlert size={32} />, color: 'from-neonPink to-red-500', glow: 'shadow-[0_0_20px_rgba(255,0,127,0.4)]', text: 'text-neonPink' },
    ];

    return (
        <div className="space-y-8 mt-2 relative z-10">
            <div className="flex justify-between items-end pb-4">
                <div>
                    <h2 className="text-4xl font-black font-display tracking-tight text-gradient-primary">
                        Control Center
                    </h2>
                    <p className="text-white/60 font-medium mt-2 text-lg">Real-time pulse of the VehiSync network.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        key={card.title}
                        className="vibrant-glass p-8 relative overflow-hidden group"
                    >
                        {/* Animated Gradient Background on Hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 z-0`}></div>

                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <p className="text-white/70 font-semibold mb-2">{card.title}</p>
                                <h3 className="text-5xl font-black font-display tracking-tight">
                                    {card.value.toLocaleString()}
                                </h3>
                            </div>

                            <div className={`p-4 rounded-2xl bg-white/10 ${card.text} ${card.glow} backdrop-blur-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                                {card.icon}
                            </div>
                        </div>

                        <div className="relative z-10 mt-6 flex items-center gap-2 text-sm font-medium">
                            <TrendingUp size={16} className={card.text} />
                            <span className={card.text}>+12.5%</span>
                            <span className="text-white/40 ml-1">from last week</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Main Feature Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
                <div className="lg:col-span-2 vibrant-glass p-8 min-h-[450px] relative overflow-hidden group">
                    {/* Colorful wave background graphic */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neonPink via-bgMid to-bgStart"></div>

                    <div className="relative z-10 flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-bold font-display text-white">Network Activity</h3>
                        <button className="bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-xl transition-colors backdrop-blur-md border border-white/20">
                            View Report
                        </button>
                    </div>

                    <div className="relative w-full h-72 flex items-center justify-center">
                        {/* Visual representation of a highly colorful, active network/chart */}
                        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-neonCyan/20 to-transparent rounded-b-3xl"></div>

                        <div className="flex items-end gap-4 h-48 justify-center w-full px-10 relative z-20">
                            {[40,70,45,90,65,85,100,60,80,50].map((height, i) => (
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${height}%` }}
                                    transition={{ delay: 0.5 + i * 0.1, duration: 1, type: "spring" }}
                                    key={i}
                                    className="w-full relative group/bar rounded-t-lg"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-neonPurple to-neonCyan rounded-t-lg shadow-[0_0_15px_rgba(0,243,255,0.4)] opacity-80 group-hover/bar:opacity-100 transition-opacity cursor-pointer"></div>
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 bg-white/20 backdrop-blur-md px-2 py-1 rounded-md text-xs font-bold transition-all z-30">
                                        {height}%
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Glowing line chart overlay concept */}
                        <svg className="absolute inset-0 w-full h-full overflow-visible z-10 opacity-70" preserveAspectRatio="none">
                            <path d="M 50 150 Q 150 50 250 180 T 450 100 T 650 160 T 850 80" fill="none" stroke="url(#gradient-line)" strokeWidth="6" className="drop-shadow-[0_0_10px_#FF007F]" />
                            <defs>
                                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#FF007F" />
                                    <stop offset="50%" stopColor="#FBFF00" />
                                    <stop offset="100%" stopColor="#00F3FF" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>

                <div className="vibrant-glass p-8 min-h-[450px] flex flex-col relative overflow-hidden">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-neonPurple rounded-full mix-blend-screen blur-[80px] opacity-40"></div>

                    <h3 className="text-2xl font-bold font-display text-white mb-6 relative z-10">Recent Actions</h3>

                    <div className="flex-1 space-y-5 relative z-10 overflow-auto">
                        {[
                            { title: 'Vehicle Registered', desc: 'VH-0921 • Tesla Model S', time: '2m ago', color: 'bg-neonCyan' },
                            { title: 'Policy Renewed', desc: 'POL-AX92 • Comprehensive', time: '15m ago', color: 'bg-neonYellow' },
                            { title: 'Access Alert', desc: 'Unauthorized Verification', time: '1h ago', color: 'bg-neonPink' },
                            { title: 'Owner Linked', desc: 'Jane Doe -> VH-0012', time: '3h ago', color: 'bg-neonPurple' },
                            { title: 'System Backup', desc: 'Snapshot stored to AWS', time: '5h ago', color: 'bg-blue-500' },
                        ].map((action, i) => (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + i * 0.1 }}
                                key={i}
                                className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
                            >
                                <div className={`mt-1 w-3 h-3 rounded-full ${action.color} shadow-[0_0_10px_currentColor] group-hover:scale-150 transition-transform`}></div>
                                <div className="flex-1">
                                    <h4 className="text-white font-bold">{action.title}</h4>
                                    <p className="text-white/60 text-sm">{action.desc}</p>
                                </div>
                                <span className="text-xs font-bold text-white/40">{action.time}</span>
                            </motion.div>
                        ))}
                    </div>

                    <button className="btn-neon-pink w-full mt-6 text-sm py-4 relative z-10">
                        View All Activity
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

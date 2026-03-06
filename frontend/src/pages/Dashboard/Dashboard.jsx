import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Users, ShieldCheck, ShieldAlert, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalVehicles: 0,
        totalOwners: 0,
        activeInsurance: 0,
        unauthorized: 0
    });

    useEffect(() => {
        // Mock fetch
        setStats({
            totalVehicles: 1542,
            totalOwners: 980,
            activeInsurance: 1250,
            unauthorized: 45
        });
    }, []);

    const statCards = [
        { title: 'Total Vehicles', value: stats.totalVehicles, icon: <Car size={20} />, trend: '+12.5%', trendUp: true },
        { title: 'Registered Owners', value: stats.totalOwners, icon: <Users size={20} />, trend: '+8.2%', trendUp: true },
        { title: 'Active Policies', value: stats.activeInsurance, icon: <ShieldCheck size={20} />, trend: '+15.3%', trendUp: true },
        { title: 'Flagged Assets', value: stats.unauthorized, icon: <ShieldAlert size={20} />, trend: '-2.4%', trendUp: false },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-textMain tracking-tight">Overview</h2>
                    <p className="text-textMuted text-sm mt-1">Monitor the state of identity verifications and entities.</p>
                </div>
                <div className="space-x-3">
                    <button className="bg-card border border-cardBorder text-textMain px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#1F2937] transition-colors shadow-sm">
                        Download Report
                    </button>
                    <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primaryHover transition-colors shadow-sm">
                        New Verification
                    </button>
                </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        key={card.title}
                        className="glass-card p-5 hover:border-gray-600 transition-colors"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-textMuted text-sm font-medium mb-1">{card.title}</p>
                                <h3 className="text-3xl font-bold text-textMain">{card.value.toLocaleString()}</h3>
                            </div>
                            <div className="p-2.5 rounded-lg bg-[#1F2937] text-textMuted">
                                {card.icon}
                            </div>
                        </div>

                        <div className="mt-4 flex items-center text-sm">
                            <span className={`flex items-center font-medium ${card.trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
                                {card.trendUp ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowUpRight size={16} className="mr-1 rotate-90" />}
                                {card.trend}
                            </span>
                            <span className="text-textMuted ml-2">vs last month</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Placeholder Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                <div className="lg:col-span-2 glass-card p-6 min-h-[400px]">
                    <h3 className="text-lg font-semibold text-textMain mb-4">Registration Activity</h3>
                    <div className="w-full h-[300px] border border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                        <p className="text-textMuted text-sm">Chart Component Placeholder</p>
                    </div>
                </div>
                <div className="glass-card p-6 min-h-[400px]">
                    <h3 className="text-lg font-semibold text-textMain mb-4">Recent Verifications</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="flex items-center justify-between pb-4 border-b border-cardBorder last:border-0 last:pb-0">
                                <div>
                                    <p className="text-sm font-medium text-textMain">VH-{(100 * i).toString().padStart(4, '0')}</p>
                                    <p className="text-xs text-textMuted">Just now</p>
                                </div>
                                <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-500">
                                    Authorized
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

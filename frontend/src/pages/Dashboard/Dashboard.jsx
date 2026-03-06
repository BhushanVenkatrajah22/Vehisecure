import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Users, ShieldAlert, CheckCircle } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalVehicles: 0,
        totalOwners: 0,
        activeInsurance: 0,
        unauthorized: 0
    });

    // Since we haven't connected real APIs yet, we'll mock it or fetch when ready
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
        { title: 'Total Vehicles', value: stats.totalVehicles, icon: <Car size={24} />, color: 'from-blue-500 to-electricBlue', shadow: 'shadow-blue-500/50' },
        { title: 'Registered Owners', value: stats.totalOwners, icon: <Users size={24} />, color: 'from-purple-500 to-pink-500', shadow: 'shadow-purple-500/50' },
        { title: 'Active Insurance', value: stats.activeInsurance, icon: <CheckCircle size={24} />, color: 'from-emerald-400 to-teal-500', shadow: 'shadow-emerald-500/50' },
        { title: 'Unauthorized', value: stats.unauthorized, icon: <ShieldAlert size={24} />, color: 'from-red-500 to-orange-500', shadow: 'shadow-red-500/50' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 tracking-tight">System Status Outline</h2>
                    <p className="text-gray-400 mt-2">Overview of identity verifications and platform entities.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={card.title}
                        className="glass-card p-6 relative overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                    >
                        <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${card.color} rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity`}></div>

                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg bg-gradient-to-br ${card.color} text-white shadow-lg ${card.shadow}`}>
                                {card.icon}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-gray-400 text-sm font-medium">{card.title}</h3>
                            <p className="text-3xl font-bold text-white mt-1 group-hover:text-neonCyan transition-colors">{card.value.toLocaleString()}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Placeholder for charts or recent activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2 glass-card h-96 p-6 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    <p className="text-gray-500 text-lg font-light tracking-widest relative z-10">NETWORK TRAFFIC VISUALIZATION (PENDING)</p>
                </div>
                <div className="glass-card h-96 p-6 flex flex-col items-center justify-center">
                    <div className="w-32 h-32 rounded-full border-4 border-dashed border-electricBlue animate-[spin_10s_linear_infinite] flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full border-4 border-solid border-neonCyan animate-[spin_3s_linear_infinite_reverse]"></div>
                    </div>
                    <p className="text-neonCyan mt-8 font-mono text-sm">NODE SYNC ACTIVE</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

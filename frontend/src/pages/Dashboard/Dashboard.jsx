import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Shield, Radio, ShieldAlert } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalVehicles: 0,
        totalOwners: 0,
        activeInsurance: 0,
        unauthorized: 0
    });

    useEffect(() => {
        // Cyberpunk themed fast-counting animation effect simulation
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
        }, 50);

        return () => clearInterval(interval);
    }, []);

    const statCards = [
        { title: 'ASSETS REGISTERED', value: stats.totalVehicles, icon: <Database size={28} />, color: 'text-cyberBlue', border: 'border-cyberBlue', glow: 'shadow-glow-cyan', bgGlow: 'bg-cyberBlue/5' },
        { title: 'PERSONNEL LOG', value: stats.totalOwners, icon: <Radio size={28} />, color: 'text-deepPurple', border: 'border-deepPurple', glow: 'shadow-glow-purple', bgGlow: 'bg-deepPurple/5' },
        { title: 'ACTIVE SHIELDS', value: stats.activeInsurance, icon: <Shield size={28} />, color: 'text-neonGreen', border: 'border-neonGreen', glow: 'shadow-[0_0_15px_rgba(5,150,105,0.5),inset_0_0_10px_rgba(5,150,105,0.1)]', bgGlow: 'bg-neonGreen/5' },
        { title: 'SECURITY BREACH', value: stats.unauthorized, icon: <ShieldAlert size={28} />, color: 'text-alertRed', border: 'border-alertRed', glow: 'shadow-[0_0_15px_rgba(225,29,72,0.5),inset_0_0_10px_rgba(225,29,72,0.1)]', bgGlow: 'bg-alertRed/5' },
    ];

    return (
        <div className="space-y-8 mt-4">
            <div className="flex justify-between items-end border-b border-slate-700/50 pb-4">
                <div>
                    <h2 className="text-3xl font-black font-mono tracking-widest text-white flex items-center gap-4">
                        <span className="w-4 h-8 bg-cyberBlue inline-block shadow-glow-cyan"></span>
                        MAINFRAME OVERVIEW
                    </h2>
                    <p className="text-cyberBlue/70 font-mono text-sm mt-3 tracking-widest">REALTIME NETWORK TELEMETRY & DATA METRICS</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                        key={card.title}
                        className={`cyber-panel p-6 ${card.bgGlow} flex justify-between items-center group cursor-default`}
                    >
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${card.bgGlow.replace('/5', '')} ${card.glow}`}></div>

                        <div className="z-10">
                            <p className="text-slate-400 font-mono text-xs tracking-[0.2em] mb-2">{card.title}</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className={`text-4xl font-black font-mono tracking-wider ${card.color} drop-shadow-[0_0_8px_currentColor]`}>
                                    {String(card.value).padStart(4, '0')}
                                </h3>
                            </div>
                        </div>

                        <div className={`p-4 rounded-xl border ${card.border}/30 ${card.color} ${card.glow} bg-slate-900/50 z-10 group-hover:scale-110 transition-transform duration-500`}>
                            {card.icon}
                        </div>

                        {/* Futuristic Tech Decals */}
                        <div className={`absolute right-2 top-2 text-[8px] font-mono opacity-30 ${card.color}`}>[SEC-{index + 1}A]</div>
                    </motion.div>
                ))}
            </div>

            {/* Cyberpunk Map/Chart Concept Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
                <div className="lg:col-span-2 cyber-panel p-0 min-h-[400px] flex overflow-hidden">
                    {/* Fake Radar/Network graphic */}
                    <div className="relative w-full h-full flex items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-0"></div>

                        <div className="relative z-10 w-64 h-64 border border-cyberBlue/30 rounded-full flex items-center justify-center">
                            <div className="absolute w-[1px] h-full bg-cyberBlue/30"></div>
                            <div className="absolute h-[1px] w-full bg-cyberBlue/30"></div>
                            <div className="w-48 h-48 border border-cyberBlue/50 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                                <div className="w-4 h-4 rounded-full bg-cyberBlue absolute top-[-8px] shadow-glow-cyan"></div>
                            </div>
                            <div className="w-32 h-32 border border-cyberBlue/80 rounded-full flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,240,255,0.2)]">
                                <div className="text-center">
                                    <div className="text-cyberBlue font-mono font-bold text-xl drop-shadow-[0_0_5px_currentColor]">SYNC</div>
                                    <div className="text-[10px] text-cyberBlue/60 font-mono tracking-widest mt-1">UPLINK STABLE</div>
                                </div>
                            </div>
                            {/* Sweep arc */}
                            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(0,240,255,0)_0%,rgba(0,240,255,0.4)_20%,rgba(0,240,255,0)_20%)] animate-[spin_4s_linear_infinite]"></div>
                        </div>

                        <div className="absolute left-8 top-8 font-mono text-xs text-cyberBlue/60 space-y-1">
                            <p>LAT: 45.9221</p>
                            <p>LNG: -12.4411</p>
                            <p>GRID: C-74</p>
                        </div>
                    </div>
                </div>

                <div className="cyber-panel p-6 min-h-[400px] flex flex-col justify-between relative">
                    <div className="absolute right-0 top-10 w-1 h-32 bg-cyberBlue shadow-glow-cyan"></div>
                    <div>
                        <h3 className="text-xl font-bold font-mono text-cyberBlue tracking-widest mb-6">SYSTEM LOG</h3>
                        <div className="space-y-4 font-mono text-xs">
                            {[
                                { time: '14:02:44', msg: 'ASSET VH-0921 VERIFIED', status: 'OK' },
                                { time: '14:00:12', msg: 'POLICY EXPIRY WARNING [ID: 9X]', status: 'WARN' },
                                { time: '13:58:55', msg: 'UNAUTHORIZED ACCESS ATTEMPT', status: 'ERR' },
                                { time: '13:55:01', msg: 'ASSET VH-0012 VERIFIED', status: 'OK' },
                                { time: '13:42:19', msg: 'NEW PERSONNEL REGISTRATION', status: 'OK' },
                            ].map((log, i) => (
                                <div key={i} className="flex gap-4 border-b border-slate-700/50 pb-3">
                                    <span className="text-slate-500 w-16">{log.time}</span>
                                    <span className={`flex-1 ${log.status === 'OK' ? 'text-slate-300' :
                                            log.status === 'WARN' ? 'text-yellow-400' : 'text-alertRed'
                                        }`}>{log.msg}</span>
                                    <span className={`px-2 rounded bg-slate-800 ${log.status === 'OK' ? 'text-neonGreen' :
                                            log.status === 'WARN' ? 'text-yellow-400' : 'text-alertRed font-bold animate-pulse'
                                        }`}>
                                        [{log.status}]
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="cyber-button w-full mt-4 text-xs">EXPORT COMPLETE LOGS</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

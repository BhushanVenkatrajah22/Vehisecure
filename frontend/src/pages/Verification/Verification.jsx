import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, View } from 'lucide-react';

const Verification = () => {
    const [vehicleId,setVehicleId] = useState('');
    const [result,setResult] = useState(null);
    const [loading,setLoading] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        setTimeout(async () => {
            try {
                const res = await axios.post('http://localhost:5000/vehicle/verify', { vehicleId });
                setResult(res.data);
            } catch (error) {
                setResult({ status: 'Error', reason: error.response?.data?.message || 'Access Denied: Missing Metadata' });
            } finally {
                setLoading(false);
            }
        }, 1200);
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center relative mt-4">

            {/* Heavy Glowing Aura */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neonCyan via-neonPurple to-transparent rounded-full blur-[100px] mix-blend-screen animate-pulse-glow"></div>
            </div>

            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="vibrant-glass w-full max-w-2xl p-12 relative z-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] border-white/20"
            >
                <div className="text-center mb-10 relative z-20">
                    <div className="inline-flex justify-center items-center mb-6">
                        <div className="p-4 rounded-3xl bg-gradient-to-br from-neonCyan to-neonPurple shadow-[0_0_30px_rgba(0,243,255,0.6)] animate-bounce">
                            <View size={48} className="text-white" />
                        </div>
                    </div>
                    <h2 className="text-5xl font-black font-display tracking-tight text-white mb-2">Deep Scan</h2>
                    <p className="text-neonCyan font-bold text-lg">Cross-reference master database across all vectors.</p>
                </div>

                <form onSubmit={handleVerify} className="space-y-8 relative z-20">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="ENTER ASSET ID"
                            required
                            className="w-full bg-black/40 border-2 border-white/20 text-white text-center text-4xl font-bold font-display rounded-3xl p-8 focus:outline-none focus:border-neonCyan focus:ring-4 focus:ring-neonCyan/30 transition-all uppercase placeholder:text-white/20 backdrop-blur-xl shadow-inner"
                            value={vehicleId}
                            onChange={e => setVehicleId(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full relative overflow-hidden bg-gradient-to-r from-neonCyan via-blue-500 to-neonPurple font-black font-display text-white text-xl py-6 px-6 rounded-3xl shadow-[0_0_30px_rgba(0,243,255,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(176,38,255,0.6)] disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-3">
                                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Executing Deep Scan...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center">
                                Initiate Scan Sequence
                            </span>
                        )}
                    </button>
                </form>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className="mt-8 relative"
                        >
                            <div className={`rounded-3xl p-8 relative overflow-hidden backdrop-blur-2xl border-2 shadow-2xl ${result.status === 'Authorized'
                                    ? 'border-neonCyan bg-neonCyan/10 shadow-[0_0_40px_rgba(0,243,255,0.3)]'
                                    : 'border-neonPink bg-neonPink/10 shadow-[0_0_40px_rgba(255,0,127,0.3)]'
                                }`}>

                                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10 text-center md:text-left">
                                    <div className="shrink-0">
                                        {result.status === 'Authorized' ? (
                                            <div className="bg-neonCyan rounded-full p-4 shadow-[0_0_20px_rgba(0,243,255,0.8)]">
                                                <ShieldCheck size={48} className="text-black" />
                                            </div>
                                        ) : (
                                            <div className="bg-neonPink rounded-full p-4 shadow-[0_0_20px_rgba(255,0,127,0.8)] animate-pulse">
                                                <ShieldAlert size={48} className="text-white" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 w-full">
                                        <h3 className={`text-4xl font-black font-display tracking-tight mb-2 ${result.status === 'Authorized' ? 'text-neonCyan' : 'text-neonPink'
                                            }`}>
                                            {result.status === 'Authorized' ? 'Access Granted' : 'Access Denied'}
                                        </h3>

                                        {result.status === 'Authorized' && result.data ? (
                                            <div className="mt-6 space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div className="bg-black/30 rounded-2xl p-4 border border-white/10">
                                                        <p className="text-neonCyan font-bold text-xs uppercase tracking-widest mb-1">Asset Frame</p>
                                                        <p className="text-white font-black text-xl">{result.data.manufacturer} {result.data.model}</p>
                                                        <p className="text-white/50 text-sm mt-1">VIN: {result.data.VIN}</p>
                                                    </div>
                                                    <div className="bg-black/30 rounded-2xl p-4 border border-white/10">
                                                        <p className="text-neonPurple font-bold text-xs uppercase tracking-widest mb-1">Owner Node</p>
                                                        <p className="text-white font-black text-xl">{result.data.owner?.name}</p>
                                                        <p className="text-white/50 text-sm mt-1">ID: {result.data.owner?.ownerId}</p>
                                                    </div>
                                                </div>
                                                <div className="bg-gradient-to-r from-neonCyan/20 to-blue-500/20 border border-neonCyan/30 rounded-2xl p-4 flex justify-between items-center">
                                                    <div>
                                                        <span className="text-white/70 text-sm block mb-1 font-medium">Active Policy Link</span>
                                                        <span className="text-white font-bold text-lg">{result.data.insurance?.provider}</span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="px-3 py-1 bg-neonCyan text-black text-xs font-bold uppercase rounded-lg shadow-[0_0_10px_rgba(0,243,255,0.5)]">Secured</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="mt-4 bg-black/30 rounded-2xl p-6 border border-neonPink/30">
                                                <p className="text-white/70 text-sm font-medium mb-2 uppercase tracking-widest text-center md:text-left">Rejection Cause:</p>
                                                <p className="text-white text-xl font-bold text-center md:text-left">{result.reason}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </div>
    );
};

export default Verification;

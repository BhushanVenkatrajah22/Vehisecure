import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, Fingerprint, Loader2 } from 'lucide-react';

const Verification = () => {
    const [vehicleId, setVehicleId] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        // Simulate a slight network delay for dramatic validation effect
        setTimeout(async () => {
            try {
                const res = await axios.post('http://localhost:5000/vehicle/verify', { vehicleId });
                setResult(res.data);
            } catch (error) {
                setResult({ status: 'Error', reason: error.response?.data?.message || 'Verification execution failure' });
            } finally {
                setLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center py-10 relative">

            {/* Immersive background glow */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                <div className="w-[500px] h-[500px] bg-electricBlue rounded-full blur-[150px] mix-blend-screen animate-pulse-slow"></div>
            </div>

            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-card w-full max-w-2xl p-10 relative z-10 shadow-[0_0_50px_rgba(0,82,255,0.15)] overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neonCyan via-electricBlue to-purple-500"></div>

                <div className="text-center mb-10">
                    <div className="inline-flex justify-center items-center p-4 rounded-full bg-deepBlue shadow-[0_0_20px_rgba(0,240,255,0.3)] mb-6 border border-glassBorder/50">
                        <Fingerprint size={48} className="text-neonCyan animate-pulse" />
                    </div>
                    <h2 className="text-4xl font-black tracking-[0.2em] text-white">IDENTITY VERIFICATION</h2>
                    <p className="text-neonCyan mt-3 font-mono text-sm tracking-widest">AWAITING TARGET DESIGNATION</p>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="ENTER VEHICLE ID (e.g., VH-001)"
                            required
                            className="w-full bg-darkBg/80 border-2 border-electricBlue/50 text-white text-center text-xl tracking-[0.3em] font-mono rounded-xl p-6 focus:outline-none focus:border-neonCyan focus:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all uppercase placeholder:text-gray-600"
                            value={vehicleId}
                            onChange={e => setVehicleId(e.target.value)}
                        />
                        {/* Corner tech accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neonCyan m-2 pointer-events-none"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neonCyan m-2 pointer-events-none"></div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full relative overflow-hidden bg-transparent border border-neonCyan text-neonCyan font-black tracking-[0.2em] py-5 px-6 rounded-xl transition-all duration-300 hover:bg-neonCyan hover:text-black hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-3">
                                <Loader2 size={24} className="animate-spin" />
                                EXECUTING SCAN...
                            </span>
                        ) : (
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                INITIATE VERIFICATION
                            </span>
                        )}
                        <div className="absolute inset-0 h-full w-full bg-neonCyan opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    </button>
                </form>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className={`rounded-xl p-6 border-2 relative overflow-hidden ${result.status === 'Authorized'
                                    ? 'bg-emerald-900/20 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]'
                                    : 'bg-red-900/20 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]'
                                }`}
                        >
                            <div className="flex items-start gap-4 z-10 relative">
                                {result.status === 'Authorized' ? (
                                    <ShieldCheck size={40} className="text-emerald-400 mt-1 flex-shrink-0" />
                                ) : (
                                    <ShieldAlert size={40} className="text-red-400 mt-1 flex-shrink-0 animate-pulse" />
                                )}

                                <div>
                                    <h3 className={`text-2xl font-black tracking-widest ${result.status === 'Authorized' ? 'text-emerald-400' : 'text-red-500'
                                        }`}>
                                        {result.status === 'Authorized' ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
                                    </h3>

                                    {result.status === 'Authorized' ? (
                                        <div className="mt-4 space-y-2 text-gray-300 font-mono text-sm border-t border-emerald-500/30 pt-4">
                                            <p className="text-emerald-300 mb-2">TARGET VERIFIED SECURE</p>
                                            <p>OWNER: <span className="text-white">{result.data.owner?.name}</span></p>
                                            <p>INSURANCE: <span className="text-white">{result.data.insurance?.provider} (ACTIVE)</span></p>
                                            <p>VEHICLE: <span className="text-white">{result.data.manufacturer} {result.data.model}</span></p>
                                        </div>
                                    ) : (
                                        <div className="mt-4 border-t border-red-500/30 pt-4">
                                            <p className="text-red-300 font-mono text-sm">REASON CODE:</p>
                                            <p className="text-white mt-1 font-semibold">{result.reason}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Scanline effect for dramatic tech feel */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-[10px] w-full animate-[scan_2s_ease-in-out_infinite]"></div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </div>
    );
};

export default Verification;

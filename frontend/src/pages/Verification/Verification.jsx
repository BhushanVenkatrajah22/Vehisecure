import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ShieldCheck, ScanLine } from 'lucide-react';

const Verification = () => {
    const [vehicleId, setVehicleId] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        // Dramatic verification effect delay
        setTimeout(async () => {
            try {
                const res = await axios.post('http://localhost:5000/vehicle/verify', { vehicleId });
                setResult(res.data);
            } catch (error) {
                setResult({ status: 'Error', reason: error.response?.data?.message || 'CRITICAL FAILURE: NODE UNREACHABLE' });
            } finally {
                setLoading(false);
            }
        }, 1500);
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center relative">

            {/* Immersive glowing background behind the scanner */}
            <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                <div className="w-[600px] h-[600px] bg-cyberBlue rounded-full blur-[200px] mix-blend-screen animate-pulse-glow"></div>
            </div>

            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="cyber-panel w-full max-w-2xl p-10 relative z-10 overflow-hidden"
            >
                {/* Scanner frame accents */}
                <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-cyberBlue m-4 pointer-events-none opacity-80"></div>
                <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-cyberBlue m-4 pointer-events-none opacity-80"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-cyberBlue m-4 pointer-events-none opacity-80"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-cyberBlue m-4 pointer-events-none opacity-80"></div>

                <div className="text-center mb-10 mt-6 relative z-20">
                    <div className="inline-flex justify-center items-center mb-6 relative">
                        <div className="absolute inset-0 bg-cyberBlue blur-[20px] opacity-30 animate-pulse"></div>
                        <ScanLine size={56} className="text-cyberBlue drop-shadow-glow-cyan" />
                    </div>
                    <h2 className="text-4xl font-black font-mono tracking-[0.3em] text-white">IDENTITY SCAN</h2>
                    <p className="text-cyberBlue font-mono text-xs mt-3 tracking-[0.2em] animate-pulse">AWAITING TARGET INPUT VECTOR</p>
                </div>

                <form onSubmit={handleVerify} className="space-y-8 relative z-20 px-8">
                    <div className="relative">
                        {/* The input field representing the scanner target area */}
                        <input
                            type="text"
                            placeholder="_ ENTER REGISTRY ID"
                            required
                            className="w-full bg-slate-900/80 border-2 border-cyberBlue text-cyberBlue text-center text-3xl font-bold font-mono rounded-xl p-8 focus:outline-none focus:shadow-glow-cyan transition-all uppercase placeholder:text-cyberBlue/30 tracking-[0.2em]"
                            value={vehicleId}
                            onChange={e => setVehicleId(e.target.value)}
                        />
                        {/* Horizontal scanline animating over the input */}
                        <div className="absolute inset-x-0 h-1 bg-cyberBlue/50 shadow-glow-cyan animate-[scanline_2s_linear_infinite] pointer-events-none"></div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full relative overflow-hidden bg-transparent border-2 border-cyberBlue text-cyberBlue font-black font-mono tracking-[0.2em] py-5 px-6 rounded-xl transition-all duration-300 hover:bg-cyberBlue hover:text-black hover:shadow-glow-cyan disabled:border-slate-700 disabled:text-slate-500 disabled:bg-transparent disabled:cursor-not-allowed disabled:shadow-none group"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-3 animate-pulse">
                                <span className="w-4 h-4 rounded-full bg-cyberBlue inline-block animate-[ping_1s_cubic-bezier(0,0,0.2,1)_infinite]"></span>
                                PROCESSING DATAFLOW...
                            </span>
                        ) : (
                            <span className="relative z-10 flex items-center justify-center">
                                [ INITIATE OVERRIDE SEQUENCE ]
                            </span>
                        )}
                    </button>
                </form>

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-8"
                        >
                            <div className={`mt-10 rounded-xl p-6 relative overflow-hidden cyber-panel ${result.status === 'Authorized'
                                    ? 'border-neonGreen bg-neonGreen/10 shadow-[0_0_30px_rgba(5,150,105,0.2)]'
                                    : 'border-alertRed bg-alertRed/10 shadow-[0_0_30px_rgba(225,29,72,0.2)]'
                                }`}>

                                {/* Result Background Pulse */}
                                <div className={`absolute inset-0 ${result.status === 'Authorized' ? 'bg-neonGreen' : 'bg-alertRed'} opacity-10 blur-xl animate-pulse`}></div>

                                <div className="flex items-start gap-6 relative z-10">
                                    <div className="mt-1">
                                        {result.status === 'Authorized' ? (
                                            <ShieldCheck size={48} className="text-neonGreen drop-shadow-[0_0_10px_rgba(5,150,105,0.8)]" />
                                        ) : (
                                            <ShieldAlert size={48} className="text-alertRed animate-pulse drop-shadow-[0_0_10px_rgba(225,29,72,0.8)]" />
                                        )}
                                    </div>

                                    <div className="flex-1 w-full">
                                        <h3 className={`text-2xl font-black font-mono tracking-widest ${result.status === 'Authorized' ? 'text-neonGreen' : 'text-alertRed'
                                            }`}>
                                            {result.status === 'Authorized' ? 'ACCESS GRANTED' : 'ACCESS DENIED'}
                                        </h3>

                                        {result.status === 'Authorized' && result.data ? (
                                            <div className="mt-4 space-y-4">
                                                <div className="grid grid-cols-2 gap-4 border-t border-neonGreen/20 pt-4 text-xs font-mono">
                                                    <div>
                                                        <p className="text-neonGreen/60 tracking-widest mb-1">ASSET IDENTITY</p>
                                                        <p className="text-white font-bold">{result.data.manufacturer.toUpperCase()} {result.data.model.toUpperCase()}</p>
                                                        <p className="text-slate-400">VIN: {result.data.VIN}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-neonGreen/60 tracking-widest mb-1">OWNER CLEARANCE</p>
                                                        <p className="text-white font-bold">{result.data.owner?.name.toUpperCase()}</p>
                                                        <p className="text-slate-400">ID: {result.data.owner?.ownerId}</p>
                                                    </div>
                                                </div>
                                                <div className="bg-neonGreen/5 border border-neonGreen/20 p-3 rounded text-xs font-mono mt-4">
                                                    <div className="flex justify-between border-b border-neonGreen/20 pb-2 mb-2">
                                                        <span className="text-neonGreen">ACTIVE POLICY PROTOCOL</span>
                                                        <span className="text-white font-bold tracking-widest">{result.data.insurance?.policyNumber}</span>
                                                    </div>
                                                    <p className="text-slate-300">PROVIDER: {result.data.insurance?.provider.toUpperCase()}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="mt-4 border-t border-alertRed/30 pt-4">
                                                <p className="text-alertRed/70 font-mono text-sm tracking-widest mb-1">FATAL ERROR DIAGNOSTIC:</p>
                                                <p className="text-white text-lg font-mono font-bold tracking-widest uppercase">{result.reason}</p>
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

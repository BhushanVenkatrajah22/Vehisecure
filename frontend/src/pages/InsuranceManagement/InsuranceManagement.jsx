import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const InsuranceManagement = () => {
    const [insurances, setInsurances] = useState([]);
    const [formData, setFormData] = useState({
        policyNumber: '', provider: '', validFrom: '', validTill: '', coverageType: ''
    });

    const fetchInsurances = async () => {
        try {
            const res = await axios.get('http://localhost:5000/insurance/all');
            setInsurances(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchInsurances();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/insurance/add', formData);
            fetchInsurances();
            setFormData({ policyNumber: '', provider: '', validFrom: '', validTill: '', coverageType: '' });
        } catch (error) {
            alert(error.response?.data?.message || 'Error adding policy');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-neonGreen/50 pb-4">
                <div>
                    <h2 className="text-2xl font-black font-mono tracking-[0.2em] text-neonGreen drop-shadow-[0_0_8px_rgba(5,150,105,0.8)]">SECURITY POLICIES</h2>
                    <p className="text-slate-400 font-mono text-xs mt-2 tracking-widest">ASSET COMPLIANCE AND PROTECTION LOGS</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Registration Form */}
                <div className="cyber-panel p-6 xl:col-span-1 h-fit relative">
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-neonGreen/30 m-2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-neonGreen/30 m-2 pointer-events-none"></div>

                    <h3 className="text-lg font-bold font-mono text-white mb-6 tracking-widest flex items-center gap-3">
                        <span className="w-2 h-2 bg-neonGreen animate-pulse"></span>
                        GENERATE_POLICY
                    </h3>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-neonGreen">POLICY HASH_ID</label>
                            <input type="text" placeholder="POL-XXXX" required
                                className="cyber-input focus:border-neonGreen focus:ring-neonGreen" value={formData.policyNumber} onChange={e => setFormData({ ...formData, policyNumber: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-neonGreen">CORPORATE PROVIDER</label>
                            <input type="text" placeholder="CORP." required
                                className="cyber-input focus:border-neonGreen focus:ring-neonGreen uppercase" value={formData.provider} onChange={e => setFormData({ ...formData, provider: e.target.value })} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-neonGreen">INCEPTION DATE [SYS.TIME]</label>
                            <input type="date" required
                                className="cyber-input focus:border-neonGreen focus:ring-neonGreen text-slate-300 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" value={formData.validFrom} onChange={e => setFormData({ ...formData, validFrom: e.target.value })} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-neonGreen">TERMINATION DATE [SYS.TIME]</label>
                            <input type="date" required
                                className="cyber-input focus:border-neonGreen focus:ring-neonGreen text-slate-300 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" value={formData.validTill} onChange={e => setFormData({ ...formData, validTill: e.target.value })} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-neonGreen">COVERAGE PROTOCOL</label>
                            <select required
                                className="cyber-input focus:border-neonGreen focus:ring-neonGreen text-slate-300" value={formData.coverageType} onChange={e => setFormData({ ...formData, coverageType: e.target.value })}>
                                <option value="" disabled>-- SELECT TIER --</option>
                                <option value="Comprehensive">COMPREHENSIVE</option>
                                <option value="Third-Party">THIRD-PARTY LIAB.</option>
                                <option value="Collision">COLLISION RECOV.</option>
                            </select>
                        </div>

                        <button type="submit" className="cyber-button w-full mt-6 !text-neonGreen !border-neonGreen/50 hover:!bg-neonGreen/20 hover:!text-white hover:shadow-[0_0_15px_rgba(5,150,105,0.5)]">
                            [ INITIATE_CONTRACT ]
                        </button>
                    </form>
                </div>

                {/* Data Table */}
                <div className="cyber-panel xl:col-span-2 overflow-hidden flex flex-col relative">
                    <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-neonGreen/10 via-neonGreen/30 to-neonGreen/10"></div>

                    <div className="p-5 border-b border-slate-700/50 bg-slate-900/60 flex justify-between items-center">
                        <h3 className="text-sm font-bold font-mono tracking-widest text-white">ACTIVE_SHIELDS_LOG</h3>
                    </div>

                    <div className="overflow-x-auto flex-1 p-1">
                        <table className="w-full text-left font-mono">
                            <thead>
                                <tr className="text-neonGreen/80 text-[10px] uppercase tracking-widest border-b border-slate-800">
                                    <th className="py-4 px-6 font-normal">POL_ID</th>
                                    <th className="py-4 px-6 font-normal">SOURCE / EXPIRY</th>
                                    <th className="py-4 px-6 font-normal">PROTOCOL</th>
                                    <th className="py-4 px-6 font-normal text-center">STAT</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                                {insurances.map((ins, i) => {
                                    const isExpired = new Date(ins.validTill) < new Date();
                                    return (
                                        <motion.tr
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            key={ins._id}
                                            className="hover:bg-neonGreen/5 transition-colors"
                                        >
                                            <td className="py-4 px-6 whitespace-nowrap">
                                                <span className="text-sm font-bold tracking-widest text-white">{ins.policyNumber}</span>
                                            </td>
                                            <td className="py-4 px-6 whitespace-nowrap">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-slate-300 uppercase">{ins.provider}</span>
                                                    <span className={`text-[10px] mt-1 tracking-widest ${isExpired ? 'text-alertRed animate-pulse' : 'text-slate-500'}`}>
                                                        EXP: {new Date(ins.validTill).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-xs text-neonGreen tracking-wider">
                                                [{ins.coverageType.toUpperCase()}]
                                            </td>
                                            <td className="py-4 px-6 whitespace-nowrap text-center">
                                                <span className={`inline-flex items-center px-2 py-1 border text-[10px] tracking-widest ${!isExpired && ins.status === 'active' ? 'border-neonGreen/50 text-neonGreen bg-neonGreen/10 shadow-[0_0_10px_rgba(5,150,105,0.2)]' : 'border-alertRed/50 text-alertRed bg-alertRed/10 shadow-[0_0_10px_rgba(225,29,72,0.2)]'}`}>
                                                    {!isExpired && ins.status === 'active' ? 'ACTIVE' : 'EXPIRED'}
                                                </span>
                                            </td>
                                        </motion.tr>
                                    )
                                })}
                                {insurances.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="py-16 text-center text-slate-500 font-mono text-sm tracking-widest">
                                            NO_POLICIES_IN_MATRIX
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default InsuranceManagement;

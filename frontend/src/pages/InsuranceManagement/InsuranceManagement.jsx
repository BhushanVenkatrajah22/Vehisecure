import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ShieldPlus, ShieldAlert, FileKey } from 'lucide-react';

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
        <div className="space-y-8 relative z-10">
            <div className="flex justify-between items-end pb-4">
                <div>
                    <h2 className="text-4xl font-black font-display tracking-tight text-white flex items-center gap-4">
                        Security Policies
                        <div className="px-3 py-1 rounded-full bg-neonPurple/20 border border-neonPurple/50 text-neonPurple text-sm font-bold shadow-[0_0_15px_rgba(176,38,255,0.3)]">
                            Protection Matrix
                        </div>
                    </h2>
                    <p className="text-white/60 font-medium mt-2 text-lg">Manage coverage tiers and operational compliance logs.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Registration Form */}
                <div className="vibrant-glass p-8 xl:col-span-1 h-fit relative overflow-hidden group">
                    <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-neonPurple rounded-full mix-blend-screen blur-[60px] opacity-20 group-hover:opacity-50 transition-opacity duration-700"></div>

                    <h3 className="text-2xl font-bold font-display text-white mb-6 relative z-10 flex items-center gap-3">
                        <ShieldPlus size={28} className="text-neonPurple" />
                        Record Policy
                    </h3>

                    <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">Contract Identifier</label>
                            <input type="text" placeholder="POL-XXXX" required
                                className="vibrant-input focus:border-neonPurple focus:ring-neonPurple/50 uppercase" value={formData.policyNumber} onChange={e => setFormData({ ...formData, policyNumber: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">Governing Provider</label>
                            <input type="text" placeholder="Insurance Co" required
                                className="vibrant-input focus:border-neonPurple focus:ring-neonPurple/50" value={formData.provider} onChange={e => setFormData({ ...formData, provider: e.target.value })} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">Activation Timestamp</label>
                            <input type="date" required
                                className="vibrant-input focus:border-neonPurple focus:ring-neonPurple/50 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" value={formData.validFrom} onChange={e => setFormData({ ...formData, validFrom: e.target.value })} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">Expiration Timestamp</label>
                            <input type="date" required
                                className="vibrant-input focus:border-neonPurple focus:ring-neonPurple/50 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" value={formData.validTill} onChange={e => setFormData({ ...formData, validTill: e.target.value })} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">Protection Tier</label>
                            <select required
                                className="vibrant-input focus:border-neonPurple focus:ring-neonPurple/50 text-white [&>option]:text-black" value={formData.coverageType} onChange={e => setFormData({ ...formData, coverageType: e.target.value })}>
                                <option value="" disabled>-- Select Tier --</option>
                                <option value="Comprehensive">Type A: Comprehensive</option>
                                <option value="Third-Party">Type B: Third-Party</option>
                                <option value="Collision">Type C: Collision</option>
                            </select>
                        </div>

                        <button type="submit" className="relative overflow-hidden bg-gradient-to-r from-neonPurple to-fuchsia-500 text-white font-bold py-3 px-8 rounded-2xl shadow-[0_0_20px_rgba(176,38,255,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(176,38,255,0.8)] active:scale-95 w-full flex items-center justify-center gap-2 mt-6 text-lg">
                            <ShieldPlus strokeWidth={2.5} /> Secure Policy
                        </button>
                    </form>
                </div>

                {/* Data Table */}
                <div className="vibrant-glass xl:col-span-2 overflow-hidden flex flex-col relative">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20 backdrop-blur-md">
                        <h3 className="text-xl font-bold font-display text-white flex items-center gap-3">
                            <FileKey size={24} className="text-neonPurple" />
                            Active Shield Index
                        </h3>
                    </div>

                    <div className="overflow-x-auto p-4 py-2">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-white/50 text-xs font-bold uppercase tracking-widest">
                                    <th className="py-5 px-6 font-semibold">Policy Details</th>
                                    <th className="py-5 px-6 font-semibold">Valid Duration</th>
                                    <th className="py-5 px-6 font-semibold">Tier</th>
                                    <th className="py-5 px-6 font-semibold text-center">Security State</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {insurances.map((ins, i) => {
                                    const isExpired = new Date(ins.validTill) < new Date();
                                    return (
                                        <motion.tr
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            key={ins._id}
                                            className="hover:bg-white/10 transition-colors group cursor-default"
                                        >
                                            <td className="py-5 px-6">
                                                <div className="flex flex-col">
                                                    <span className="text-lg font-bold text-white tracking-widest uppercase">{ins.policyNumber}</span>
                                                    <span className="text-neonPurple font-medium text-sm mt-1">{ins.provider}</span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6">
                                                <span className={`text-sm font-bold tracking-widest ${isExpired ? 'text-neonPink' : 'text-white/80'}`}>
                                                    EXP: {new Date(ins.validTill).toLocaleDateString()}
                                                </span>
                                            </td>
                                            <td className="py-5 px-6">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-neonPurple/30">
                                                    <span className="text-neonPurple font-bold text-sm tracking-wider uppercase">{ins.coverageType}</span>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6 whitespace-nowrap text-center">
                                                <span className={`inline-flex justify-center w-28 px-3 py-1.5 rounded-xl text-xs font-bold tracking-widest uppercase shadow-lg ${!isExpired && ins.status === 'active' ? 'bg-gradient-to-r from-neonPurple to-fuchsia-500 text-white shadow-[0_0_15px_rgba(176,38,255,0.3)]' : 'bg-gradient-to-r from-neonPink to-red-500 text-white shadow-[0_0_15px_rgba(255,0,127,0.3)]'}`}>
                                                    {!isExpired && ins.status === 'active' ? 'Secured' : 'Expired/Void'}
                                                </span>
                                            </td>
                                        </motion.tr>
                                    )
                                })}
                                {insurances.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="py-20 text-center">
                                            <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-white/5 mb-4 border border-white/10">
                                                <ShieldAlert size={32} className="text-white/30" />
                                            </div>
                                            <p className="text-white/50 font-bold text-lg">No policies recorded in the matrix.</p>
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

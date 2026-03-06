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
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Policy Contracts</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Registration Form */}
                <div className="glass-card p-6 lg:col-span-1 border-t-2 border-emerald-500/50">
                    <h3 className="text-xl font-bold text-emerald-400 mb-6 border-b border-glassBorder pb-2">Generate Policy Data</h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Policy Number" required
                            className="neon-input focus:ring-emerald-500 focus:border-emerald-500" value={formData.policyNumber} onChange={e => setFormData({ ...formData, policyNumber: e.target.value })} />
                        <input type="text" placeholder="Provider Network" required
                            className="neon-input focus:ring-emerald-500 focus:border-emerald-500" value={formData.provider} onChange={e => setFormData({ ...formData, provider: e.target.value })} />

                        <div className="space-y-1">
                            <label className="text-xs text-gray-400 ml-1">Valid From</label>
                            <input type="date" required
                                className="neon-input focus:ring-emerald-500 focus:border-emerald-500 text-gray-300" value={formData.validFrom} onChange={e => setFormData({ ...formData, validFrom: e.target.value })} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs text-gray-400 ml-1">Valid Till</label>
                            <input type="date" required
                                className="neon-input focus:ring-emerald-500 focus:border-emerald-500 text-gray-300" value={formData.validTill} onChange={e => setFormData({ ...formData, validTill: e.target.value })} />
                        </div>

                        <select required
                            className="neon-input focus:ring-emerald-500 focus:border-emerald-500 text-gray-300 bg-deepBlue" value={formData.coverageType} onChange={e => setFormData({ ...formData, coverageType: e.target.value })}>
                            <option value="" disabled>Select Coverage Protocol</option>
                            <option value="Comprehensive">Comprehensive Level Alpha</option>
                            <option value="Third-Party">Third-Party Minimum</option>
                            <option value="Collision">Collision Specific</option>
                        </select>

                        <button type="submit" className="w-full relative overflow-hidden bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:bg-opacity-90 active:scale-95 mt-4">
                            SECURE CONTRACT
                        </button>
                    </form>
                </div>

                {/* Data Table */}
                <div className="glass-card p-6 lg:col-span-2 overflow-x-auto">
                    <h3 className="text-xl font-bold text-white mb-6">Active Security Policies</h3>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-glassBorder text-gray-400 text-sm">
                                <th className="pb-3 px-4 font-medium tracking-wider">POLICY ID</th>
                                <th className="pb-3 px-4 font-medium tracking-wider">PROVIDER</th>
                                <th className="pb-3 px-4 font-medium tracking-wider">COVERAGE</th>
                                <th className="pb-3 px-4 font-medium tracking-wider">EXPIRY DATE</th>
                                <th className="pb-3 px-4 font-medium tracking-wider">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {insurances.map((ins, i) => {
                                const isExpired = new Date(ins.validTill) < new Date();
                                return (
                                    <motion.tr
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={ins._id}
                                        className="border-b border-glassBorder/30 hover:bg-glassBg/50 transition-colors"
                                    >
                                        <td className="py-4 px-4 text-emerald-400 font-mono text-sm">{ins.policyNumber}</td>
                                        <td className="py-4 px-4 text-white font-semibold">{ins.provider}</td>
                                        <td className="py-4 px-4 text-gray-400 text-sm">{ins.coverageType}</td>
                                        <td className={`py-4 px-4 font-mono text-sm ${isExpired ? 'text-red-400' : 'text-gray-300'}`}>
                                            {new Date(ins.validTill).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${!isExpired && ins.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                                {!isExpired && ins.status === 'active' ? 'ACTIVE' : 'EXPIRED'}
                                            </span>
                                        </td>
                                    </motion.tr>
                                )
                            })}
                            {insurances.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="py-8 text-center text-gray-500">No active policies found in matrix.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default InsuranceManagement;

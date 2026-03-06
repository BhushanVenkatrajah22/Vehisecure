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
            <div className="flex justify-between items-center bg-card p-6 rounded-xl border border-cardBorder">
                <div>
                    <h2 className="text-2xl font-bold text-textMain tracking-tight">Insurance Policies</h2>
                    <p className="text-textMuted text-sm mt-1">Manage coverage and compliance records.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Registration Form */}
                <div className="glass-card p-6 lg:col-span-1 h-fit">
                    <h3 className="text-lg font-semibold text-textMain mb-4">Record New Policy</h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-textMuted">Policy Number</label>
                            <input type="text" placeholder="Policy ID" required
                                className="neon-input" value={formData.policyNumber} onChange={e => setFormData({ ...formData, policyNumber: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-textMuted">Provider Name</label>
                            <input type="text" placeholder="Insurance Provider" required
                                className="neon-input" value={formData.provider} onChange={e => setFormData({ ...formData, provider: e.target.value })} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-textMuted">Valid From Date</label>
                            <input type="date" required
                                className="neon-input appearance-none" value={formData.validFrom} onChange={e => setFormData({ ...formData, validFrom: e.target.value })} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-textMuted">Expiration Date</label>
                            <input type="date" required
                                className="neon-input appearance-none" value={formData.validTill} onChange={e => setFormData({ ...formData, validTill: e.target.value })} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-textMuted">Coverage Tier</label>
                            <select required
                                className="neon-input" value={formData.coverageType} onChange={e => setFormData({ ...formData, coverageType: e.target.value })}>
                                <option value="" disabled>Select Coverage Type</option>
                                <option value="Comprehensive">Comprehensive</option>
                                <option value="Third-Party">Third-Party Liability</option>
                                <option value="Collision">Collision & Payload</option>
                            </select>
                        </div>

                        <button type="submit" className="neon-button w-full mt-6">
                            Secure Policy Data
                        </button>
                    </form>
                </div>

                {/* Data Table */}
                <div className="glass-card lg:col-span-2 overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-cardBorder">
                        <h3 className="text-lg font-semibold text-textMain">Active Policy Index</h3>
                    </div>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left">
                            <thead className="bg-[#1F2937]">
                                <tr className="text-textMuted text-xs uppercase tracking-wider">
                                    <th className="py-3 px-6 font-medium">Policy ID</th>
                                    <th className="py-3 px-6 font-medium">Provider & Term</th>
                                    <th className="py-3 px-6 font-medium">Coverage</th>
                                    <th className="py-3 px-6 font-medium text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-cardBorder">
                                {insurances.map((ins, i) => {
                                    const isExpired = new Date(ins.validTill) < new Date();
                                    return (
                                        <motion.tr
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            key={ins._id}
                                            className="hover:bg-[#1C2433] transition-colors"
                                        >
                                            <td className="py-4 px-6 whitespace-nowrap">
                                                <span className="font-mono text-sm text-textMain font-medium">{ins.policyNumber}</span>
                                            </td>
                                            <td className="py-4 px-6 whitespace-nowrap text-sm">
                                                <div className="flex flex-col">
                                                    <span className="text-textMain font-medium">{ins.provider}</span>
                                                    <span className={`text-xs mt-0.5 ${isExpired ? 'text-red-400' : 'text-textMuted'}`}>
                                                        Exp: {new Date(ins.validTill).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-textMuted">
                                                <span className="bg-[#1F2937] px-2.5 py-1 rounded text-xs">{ins.coverageType}</span>
                                            </td>
                                            <td className="py-4 px-6 whitespace-nowrap text-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${!isExpired && ins.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                                    {!isExpired && ins.status === 'active' ? 'Active' : 'Expired/Inactive'}
                                                </span>
                                            </td>
                                        </motion.tr>
                                    )
                                })}
                                {insurances.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="py-12 text-center text-textMuted">No policies recorded.</td>
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

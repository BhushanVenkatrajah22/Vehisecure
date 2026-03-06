import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const OwnerManagement = () => {
    const [owners, setOwners] = useState([]);
    const [formData, setFormData] = useState({
        ownerId: '', name: '', email: '', phone: '', address: '', driverLicenseNumber: ''
    });

    const fetchOwners = async () => {
        try {
            const res = await axios.get('http://localhost:5000/owner/all');
            setOwners(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchOwners();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/owner/register', formData);
            fetchOwners();
            setFormData({ ownerId: '', name: '', email: '', phone: '', address: '', driverLicenseNumber: '' });
        } catch (error) {
            alert(error.response?.data?.message || 'Error registering owner');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-card p-6 rounded-xl border border-cardBorder">
                <div>
                    <h2 className="text-2xl font-bold text-textMain tracking-tight">Personnel Directory</h2>
                    <p className="text-textMuted text-sm mt-1">Manage registered owners and system personnel.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Registration Form */}
                <div className="glass-card p-6 lg:col-span-1 h-fit">
                    <h3 className="text-lg font-semibold text-textMain mb-4">Add Personnel</h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-textMuted">Owner ID</label>
                            <input type="text" placeholder="e.g. OW-101" required
                                className="neon-input" value={formData.ownerId} onChange={e => setFormData({ ...formData, ownerId: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-textMuted">Full Name</label>
                            <input type="text" placeholder="John Doe" required
                                className="neon-input" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-textMuted">Email Address</label>
                            <input type="email" placeholder="john@example.com" required
                                className="neon-input" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-textMuted">Phone Number</label>
                            <input type="text" placeholder="+1 (555) 000-0000" required
                                className="neon-input" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-textMuted">Driver License</label>
                            <input type="text" placeholder="License No" required
                                className="neon-input" value={formData.driverLicenseNumber} onChange={e => setFormData({ ...formData, driverLicenseNumber: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-textMuted">Address</label>
                            <textarea placeholder="Physical Address" required
                                className="neon-input h-20 resize-none" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}></textarea>
                        </div>

                        <button type="submit" className="neon-button w-full mt-6">
                            Register Personnel
                        </button>
                    </form>
                </div>

                {/* Data Table */}
                <div className="glass-card lg:col-span-2 overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-cardBorder">
                        <h3 className="text-lg font-semibold text-textMain">Active Personnel Logs</h3>
                    </div>
                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left">
                            <thead className="bg-[#1F2937]">
                                <tr className="text-textMuted text-xs uppercase tracking-wider">
                                    <th className="py-3 px-6 font-medium">Identity</th>
                                    <th className="py-3 px-6 font-medium">Contact</th>
                                    <th className="py-3 px-6 font-medium">License / Ref</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-cardBorder">
                                {owners.map((o, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={o._id}
                                        className="hover:bg-[#1C2433] transition-colors"
                                    >
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-textMain">{o.name}</span>
                                                <span className="text-xs text-textMuted mt-0.5">ID: {o.ownerId}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-textMuted">
                                            <div className="flex flex-col">
                                                <span>{o.email}</span>
                                                <span>{o.phone}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-textMuted font-mono">
                                            {o.driverLicenseNumber}
                                        </td>
                                    </motion.tr>
                                ))}
                                {owners.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="py-12 text-center text-textMuted">No personnel registered yet.</td>
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

export default OwnerManagement;

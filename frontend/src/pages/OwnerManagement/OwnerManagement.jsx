import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { UserPlus, Users, BadgeCheck } from 'lucide-react';

const OwnerManagement = () => {
    const [owners,setOwners] = useState([]);
    const [formData,setFormData] = useState({
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
        <div className="space-y-8 relative z-10">
            <div className="flex justify-between items-end pb-4">
                <div>
                    <h2 className="text-4xl font-black font-display tracking-tight text-white flex items-center gap-4">
                        Personnel Roster
                        <div className="px-3 py-1 rounded-full bg-neonYellow/20 border border-neonYellow/50 text-neonYellow text-sm font-bold shadow-[0_0_15px_rgba(251,255,0,0.3)]">
                            Authorized DB
                        </div>
                    </h2>
                    <p className="text-white/60 font-medium mt-2 text-lg">Manage registered owners and authorized personnel.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Registration Form */}
                <div className="vibrant-glass p-8 xl:col-span-1 h-fit relative overflow-hidden group">
                    <div className="absolute -top-24 -left-24 w-48 h-48 bg-neonYellow rounded-full mix-blend-screen blur-[60px] opacity-20 group-hover:opacity-50 transition-opacity duration-700"></div>

                    <h3 className="text-2xl font-bold font-display text-white mb-6 relative z-10 flex items-center gap-3">
                        <UserPlus size={28} className="text-neonYellow" />
                        Add Personnel
                    </h3>

                    <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">System Identity ID</label>
                            <input type="text" placeholder="e.g. PER-101" required
                                className="vibrant-input focus:border-neonYellow focus:ring-neonYellow/50" value={formData.ownerId} onChange={e => setFormData({ ...formData, ownerId: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">Full Legal Name</label>
                            <input type="text" placeholder="John Doe" required
                                className="vibrant-input focus:border-neonYellow focus:ring-neonYellow/50" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">Email Address</label>
                            <input type="email" placeholder="john@domain.com" required
                                className="vibrant-input focus:border-neonYellow focus:ring-neonYellow/50" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">Primary Contact</label>
                            <input type="text" placeholder="+1 555-000-0000" required
                                className="vibrant-input focus:border-neonYellow focus:ring-neonYellow/50 font-mono" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">Driver License / ID</label>
                            <input type="text" placeholder="Lic ID" required
                                className="vibrant-input focus:border-neonYellow focus:ring-neonYellow/50 uppercase" value={formData.driverLicenseNumber} onChange={e => setFormData({ ...formData, driverLicenseNumber: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">Registered Address</label>
                            <textarea placeholder="Physical location..." required
                                className="vibrant-input focus:border-neonYellow focus:ring-neonYellow/50 h-24 resize-none" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}></textarea>
                        </div>

                        <button type="submit" className="btn-neon-yellow w-full flex items-center justify-center gap-2 mt-6 text-lg">
                            <UserPlus strokeWidth={2.5} /> Enroll Personnel
                        </button>
                    </form>
                </div>

                {/* Data Table */}
                <div className="vibrant-glass xl:col-span-2 overflow-hidden flex flex-col relative">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20 backdrop-blur-md">
                        <h3 className="text-xl font-bold font-display text-white flex items-center gap-3">
                            <Users size={24} className="text-neonYellow" />
                            Roster Database
                        </h3>
                    </div>

                    <div className="overflow-x-auto p-4 py-2">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-white/50 text-xs font-bold uppercase tracking-widest">
                                    <th className="py-5 px-6 font-semibold">Identity Details</th>
                                    <th className="py-5 px-6 font-semibold">Contact Methods</th>
                                    <th className="py-5 px-6 font-semibold">Clearance Check</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {owners.map((o, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={o._id}
                                        className="hover:bg-white/10 transition-colors group cursor-default"
                                    >
                                        <td className="py-5 px-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-neonYellow to-orange-500 flex justify-center items-center shadow-[0_0_10px_rgba(251,255,0,0.4)] text-black font-bold text-xl">
                                                    {o.name.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-white text-lg">{o.name}</span>
                                                    <span className="text-xs font-bold text-neonYellow uppercase tracking-wider">ID: {o.ownerId}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-white/90 font-medium hover:text-neonYellow transition-colors">{o.email}</span>
                                                <span className="text-white/60 text-sm font-mono">{o.phone}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6">
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 border border-white/20">
                                                <BadgeCheck size={16} className="text-neonYellow" />
                                                <span className="text-white/80 font-mono text-sm tracking-wider">{o.driverLicenseNumber}</span>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                                {owners.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="py-20 text-center">
                                            <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-white/5 mb-4 border border-white/10">
                                                <Users size={32} className="text-white/30" />
                                            </div>
                                            <p className="text-white/50 font-bold text-lg">No personnel registered yet.</p>
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

export default OwnerManagement;

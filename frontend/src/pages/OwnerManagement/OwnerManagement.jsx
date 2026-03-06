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
            <div className="flex justify-between items-center border-b border-deepPurple/50 pb-4">
                <div>
                    <h2 className="text-2xl font-black font-mono tracking-[0.2em] text-deepPurple drop-shadow-[0_0_8px_rgba(109,40,217,0.8)]">PERSONNEL DATABASE</h2>
                    <p className="text-slate-400 font-mono text-xs mt-2 tracking-widest">AUTHORIZED USER REGISTRY</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Registration Form */}
                <div className="cyber-panel p-6 xl:col-span-1 h-fit relative">
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-deepPurple/30 m-2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-deepPurple/30 m-2 pointer-events-none"></div>

                    <h3 className="text-lg font-bold font-mono text-white mb-6 tracking-widest flex items-center gap-3">
                        <span className="w-2 h-2 bg-deepPurple animate-pulse shadow-glow-purple"></span>
                        ADD_PERSONNEL
                    </h3>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-deepPurple">IDENTITY HASH [ID]</label>
                            <input type="text" placeholder="e.g. OP-101" required
                                className="cyber-input focus:border-deepPurple focus:ring-deepPurple" value={formData.ownerId} onChange={e => setFormData({ ...formData, ownerId: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-deepPurple">FULL DESIGNATION [NAME]</label>
                            <input type="text" placeholder="JOHN DOE" required
                                className="cyber-input focus:border-deepPurple focus:ring-deepPurple uppercase" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-deepPurple">COMM_LINK [EMAIL]</label>
                            <input type="email" placeholder="john@example.com" required
                                className="cyber-input focus:border-deepPurple focus:ring-deepPurple" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-deepPurple">DIRECT_LINE [PHONE]</label>
                            <input type="text" placeholder="555.000.0000" required
                                className="cyber-input focus:border-deepPurple focus:ring-deepPurple font-mono" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-deepPurple">LICENSE_CERT</label>
                            <input type="text" placeholder="NO." required
                                className="cyber-input focus:border-deepPurple focus:ring-deepPurple uppercase" value={formData.driverLicenseNumber} onChange={e => setFormData({ ...formData, driverLicenseNumber: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-deepPurple">LOC_SECTOR [ADDRESS]</label>
                            <textarea placeholder="PHYSICAL SECTOR" required
                                className="cyber-input focus:border-deepPurple focus:ring-deepPurple h-20 resize-none uppercase text-xs" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}></textarea>
                        </div>

                        <button type="submit" className="cyber-button w-full mt-6 !text-deepPurple !border-deepPurple/50 hover:!bg-deepPurple/20 hover:!text-white hover:!shadow-glow-purple">
                            [ PUSH_RECORD ]
                        </button>
                    </form>
                </div>

                {/* Data Table */}
                <div className="cyber-panel xl:col-span-2 overflow-hidden flex flex-col relative">
                    <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-deepPurple/10 via-deepPurple/30 to-deepPurple/10"></div>

                    <div className="p-5 border-b border-slate-700/50 bg-slate-900/60 flex justify-between items-center">
                        <h3 className="text-sm font-bold font-mono tracking-widest text-white">PERSONNEL_INDEX_LATEST</h3>
                        <div className="text-[10px] font-mono text-deepPurple flex items-center gap-2">
                            <span className="text-xs">/// SECURE DATALINK</span>
                        </div>
                    </div>

                    <div className="overflow-x-auto flex-1 p-1">
                        <table className="w-full text-left font-mono">
                            <thead>
                                <tr className="text-deepPurple/80 text-[10px] uppercase tracking-widest border-b border-slate-800">
                                    <th className="py-4 px-6 font-normal">ENTITY</th>
                                    <th className="py-4 px-6 font-normal">CONTACT CHANNELS</th>
                                    <th className="py-4 px-6 font-normal">LICENSE / CERT</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                                {owners.map((o, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={o._id}
                                        className="hover:bg-deepPurple/5 transition-colors"
                                    >
                                        <td className="py-5 px-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-white tracking-widest uppercase">{o.name}</span>
                                                <span className="text-[10px] text-deepPurple mt-1 tracking-widest">ID: {o.ownerId}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 text-xs text-slate-400">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-cyberBlue/80 hover:text-cyberBlue transition-colors cursor-pointer">{o.email}</span>
                                                <span className="font-mono">{o.phone}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 text-xs text-slate-300 font-mono tracking-widest">
                                            {o.driverLicenseNumber}
                                        </td>
                                    </motion.tr>
                                ))}
                                {owners.length === 0 && (
                                    <tr>
                                        <td colSpan="3" className="py-16 text-center text-slate-500 font-mono text-sm tracking-widest">
                                            NO_PERSONNEL_FOUND
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

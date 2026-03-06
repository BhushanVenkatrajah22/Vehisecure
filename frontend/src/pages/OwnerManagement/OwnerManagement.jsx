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
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Personnel Database</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Registration Form */}
                <div className="glass-card p-6 lg:col-span-1 border-t-2 border-purple-500/50">
                    <h3 className="text-xl font-bold text-purple-400 mb-6 border-b border-glassBorder pb-2">Add Personnel</h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Owner ID (e.g., OW-101)" required
                            className="neon-input focus:ring-purple-500 focus:border-purple-500" value={formData.ownerId} onChange={e => setFormData({ ...formData, ownerId: e.target.value })} />
                        <input type="text" placeholder="Full Name" required
                            className="neon-input focus:ring-purple-500 focus:border-purple-500" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        <input type="email" placeholder="Email Contact" required
                            className="neon-input focus:ring-purple-500 focus:border-purple-500" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        <input type="text" placeholder="Comm Link (Phone)" required
                            className="neon-input focus:ring-purple-500 focus:border-purple-500" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                        <input type="text" placeholder="Driver License Number" required
                            className="neon-input focus:ring-purple-500 focus:border-purple-500" value={formData.driverLicenseNumber} onChange={e => setFormData({ ...formData, driverLicenseNumber: e.target.value })} />
                        <textarea placeholder="Physical Sector (Address)" required
                            className="neon-input focus:ring-purple-500 focus:border-purple-500 h-24 resize-none" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}></textarea>

                        <button type="submit" className="w-full relative overflow-hidden bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:bg-opacity-90 active:scale-95 mt-4">
                            COMMIT RECORD
                        </button>
                    </form>
                </div>

                {/* Data Table */}
                <div className="glass-card p-6 lg:col-span-2 overflow-x-auto">
                    <h3 className="text-xl font-bold text-white mb-6">Verified Personnel Log</h3>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-glassBorder text-gray-400 text-sm">
                                <th className="pb-3 px-4 font-medium tracking-wider">ID</th>
                                <th className="pb-3 px-4 font-medium tracking-wider">NAME</th>
                                <th className="pb-3 px-4 font-medium tracking-wider">CONTACT</th>
                                <th className="pb-3 px-4 font-medium tracking-wider">LICENSE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {owners.map((o, i) => (
                                <motion.tr
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={o._id}
                                    className="border-b border-glassBorder/30 hover:bg-glassBg/50 transition-colors"
                                >
                                    <td className="py-4 px-4 text-purple-400 font-mono text-sm">{o.ownerId}</td>
                                    <td className="py-4 px-4 text-white font-semibold">{o.name}</td>
                                    <td className="py-4 px-4 text-gray-400 text-sm flex flex-col gap-1">
                                        <span>{o.email}</span>
                                        <span className="text-gray-500">{o.phone}</span>
                                    </td>
                                    <td className="py-4 px-4 text-gray-300 font-mono text-sm">{o.driverLicenseNumber}</td>
                                </motion.tr>
                            ))}
                            {owners.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-gray-500">No personnel records found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default OwnerManagement;

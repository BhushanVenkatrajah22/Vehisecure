import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Plus, Database, CarFront } from 'lucide-react';

const VehicleManagement = () => {
    const [vehicles,setVehicles] = useState([]);
    const [formData,setFormData] = useState({
        vehicleId: '', VIN: '', licensePlate: '', manufacturer: '', model: '', year: ''
    });

    const fetchVehicles = async () => {
        try {
            const res = await axios.get('http://localhost:5000/vehicle/all');
            setVehicles(res.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/vehicle/register', formData);
            fetchVehicles();
            setFormData({ vehicleId: '', VIN: '', licensePlate: '', manufacturer: '', model: '', year: '' });
        } catch (error) {
            alert(error.response?.data?.message || 'Error registering vehicle');
        }
    };

    return (
        <div className="space-y-8 relative z-10">
            <div className="flex justify-between items-end pb-4">
                <div>
                    <h2 className="text-4xl font-black font-display tracking-tight text-white flex items-center gap-4">
                        Vehicle Directory
                        <div className="px-3 py-1 rounded-full bg-neonCyan/20 border border-neonCyan/50 text-neonCyan text-sm font-bold shadow-[0_0_15px_rgba(0,243,255,0.3)]">
                            Live Database
                        </div>
                    </h2>
                    <p className="text-white/60 font-medium mt-2 text-lg">Manage all connected vehicular assets across the network.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                {/* Registration Form */}
                <div className="vibrant-glass p-8 xl:col-span-1 h-fit relative overflow-hidden group">
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-neonCyan rounded-full mix-blend-screen blur-[60px] opacity-30 group-hover:opacity-60 transition-opacity duration-700"></div>

                    <h3 className="text-2xl font-bold font-display text-white mb-6 relative z-10 flex items-center gap-3">
                        <CarFront size={28} className="text-neonCyan" />
                        Register Asset
                    </h3>

                    <form className="space-y-5 relative z-10" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">System ID</label>
                            <input type="text" placeholder="e.g. VH-001" required
                                className="vibrant-input" value={formData.vehicleId} onChange={e => setFormData({ ...formData, vehicleId: e.target.value })} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">VIN Number</label>
                            <input type="text" placeholder="17-Digit Identifier" required
                                className="vibrant-input uppercase" value={formData.VIN} onChange={e => setFormData({ ...formData, VIN: e.target.value })} />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">License Plate</label>
                            <input type="text" placeholder="Registration Plate" required
                                className="vibrant-input uppercase" value={formData.licensePlate} onChange={e => setFormData({ ...formData, licensePlate: e.target.value })} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">Make</label>
                                <input type="text" placeholder="Manufacturer" required
                                    className="vibrant-input" value={formData.manufacturer} onChange={e => setFormData({ ...formData, manufacturer: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">Model</label>
                                <input type="text" placeholder="Designation" required
                                    className="vibrant-input" value={formData.model} onChange={e => setFormData({ ...formData, model: e.target.value })} />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">Model Year</label>
                            <input type="number" placeholder="YYYY" required
                                className="vibrant-input" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} />
                        </div>

                        <button type="submit" className="btn-neon-cyan w-full flex items-center justify-center gap-2 mt-8 text-lg">
                            <Plus strokeWidth={3} /> Add to Network
                        </button>
                    </form>
                </div>

                {/* Data Table */}
                <div className="vibrant-glass xl:col-span-2 overflow-hidden flex flex-col relative">
                    <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20 backdrop-blur-md">
                        <h3 className="text-xl font-bold font-display text-white flex items-center gap-3">
                            <Database size={24} className="text-neonCyan" />
                            Asset Directory
                        </h3>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/10">Filter</button>
                            <button className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors border border-white/10">Export</button>
                        </div>
                    </div>

                    <div className="overflow-x-auto p-4 py-2">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-white/50 text-xs font-bold uppercase tracking-widest">
                                    <th className="py-5 px-6 font-semibold">Identifier</th>
                                    <th className="py-5 px-6 font-semibold">VIN Details</th>
                                    <th className="py-5 px-6 font-semibold">Make & Model</th>
                                    <th className="py-5 px-6 font-semibold text-center">Connection</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {vehicles.map((v, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={v._id}
                                        className="hover:bg-white/10 transition-colors group rounded-2xl"
                                    >
                                        <td className="py-5 px-6 whitespace-nowrap">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-white text-lg">{v.licensePlate}</span>
                                                <span className="text-xs font-bold text-neonCyan">{v.vehicleId}</span>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 whitespace-nowrap text-sm text-white/70 font-mono">{v.VIN}</td>
                                        <td className="py-5 px-6 whitespace-nowrap relative">
                                            <span className="font-bold text-white relative z-10">{v.manufacturer}</span> <span className="text-white/70 relative z-10">{v.model}</span>
                                            <span className="text-xs px-2 py-1 bg-white/10 rounded-lg ml-2 relative z-10">{v.year}</span>
                                        </td>
                                        <td className="py-5 px-6 whitespace-nowrap text-center">
                                            <span className={`inline-flex justify-center w-24 px-3 py-1.5 rounded-xl text-xs font-bold tracking-widest uppercase shadow-lg ${v.status === 'active' ? 'bg-gradient-to-r from-neonCyan to-blue-500 text-white shadow-[0_0_15px_rgba(0,243,255,0.3)]' : 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-[0_0_15px_rgba(225,29,72,0.3)]'}`}>
                                                {v.status === 'active' ? 'Active' : 'Blocked'}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                                {vehicles.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="py-20 text-center">
                                            <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-white/5 mb-4 border border-white/10">
                                                <Database size={32} className="text-white/30" />
                                            </div>
                                            <p className="text-white/50 font-bold text-lg">Database empty. Awaiting assets.</p>
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

export default VehicleManagement;

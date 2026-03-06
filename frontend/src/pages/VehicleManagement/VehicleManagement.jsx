import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const VehicleManagement = () => {
    const [vehicles, setVehicles] = useState([]);
    const [formData, setFormData] = useState({
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
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-card p-6 rounded-xl border border-cardBorder">
                <div>
                    <h2 className="text-2xl font-bold text-textMain tracking-tight">Vehicles</h2>
                    <p className="text-textMuted text-sm mt-1">Manage all registered vehicles and assets.</p>
                </div>
                <button className="bg-primary hover:bg-primaryHover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
                    Export Data
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Registration Form */}
                <div className="glass-card p-6 lg:col-span-1 h-fit">
                    <h3 className="text-lg font-semibold text-textMain mb-4">Register New Vehicle</h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-textMuted">Internal ID</label>
                            <input type="text" placeholder="e.g. VH-001" required
                                className="neon-input" value={formData.vehicleId} onChange={e => setFormData({ ...formData, vehicleId: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-textMuted">VIN Number</label>
                            <input type="text" placeholder="Enter full vehicle VIN" required
                                className="neon-input" value={formData.VIN} onChange={e => setFormData({ ...formData, VIN: e.target.value })} />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-textMuted">License Plate</label>
                            <input type="text" placeholder="e.g. ABC 1234" required
                                className="neon-input" value={formData.licensePlate} onChange={e => setFormData({ ...formData, licensePlate: e.target.value })} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-textMuted">Make</label>
                                <input type="text" placeholder="Make" required
                                    className="neon-input" value={formData.manufacturer} onChange={e => setFormData({ ...formData, manufacturer: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-medium text-textMuted">Model</label>
                                <input type="text" placeholder="Model" required
                                    className="neon-input" value={formData.model} onChange={e => setFormData({ ...formData, model: e.target.value })} />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-textMuted">Year</label>
                            <input type="number" placeholder="YYYY" required
                                className="neon-input" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} />
                        </div>

                        <button type="submit" className="neon-button w-full mt-6">
                            Register Asset
                        </button>
                    </form>
                </div>

                {/* Data Table */}
                <div className="glass-card lg:col-span-2 overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-cardBorder flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-textMain">Vehicle Directory</h3>
                    </div>

                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left">
                            <thead className="bg-[#1F2937]">
                                <tr className="text-textMuted text-xs uppercase tracking-wider">
                                    <th className="py-3 px-6 font-medium">ID</th>
                                    <th className="py-3 px-6 font-medium">VIN</th>
                                    <th className="py-3 px-6 font-medium">Plate</th>
                                    <th className="py-3 px-6 font-medium">Make / Model</th>
                                    <th className="py-3 px-6 font-medium text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-cardBorder">
                                {vehicles.map((v, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={v._id}
                                        className="hover:bg-[#1C2433] transition-colors group"
                                    >
                                        <td className="py-3.5 px-6 whitespace-nowrap">
                                            <span className="text-xs font-medium text-textMuted bg-[#1F2937] px-2 py-1 rounded">{v.vehicleId}</span>
                                        </td>
                                        <td className="py-3.5 px-6 whitespace-nowrap text-sm text-textMuted">{v.VIN}</td>
                                        <td className="py-3.5 px-6 whitespace-nowrap font-medium text-textMain">{v.licensePlate}</td>
                                        <td className="py-3.5 px-6 whitespace-nowrap text-sm text-textMuted">{v.manufacturer} {v.model} <span className="text-xs ml-1 text-gray-500">({v.year})</span></td>
                                        <td className="py-3.5 px-6 whitespace-nowrap text-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${v.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {v.status === 'active' ? 'Active' : 'Blocked'}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                                {vehicles.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-textMuted">No vehicles registered yet.</td>
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

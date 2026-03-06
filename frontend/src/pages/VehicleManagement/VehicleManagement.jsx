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
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Vehicle Matrix</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Registration Form */}
                <div className="glass-card p-6 lg:col-span-1">
                    <h3 className="text-xl font-bold text-neonCyan mb-6 border-b border-glassBorder pb-2">Register Asset</h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Internal Vehicle ID" required
                            className="neon-input" value={formData.vehicleId} onChange={e => setFormData({ ...formData, vehicleId: e.target.value })} />
                        <input type="text" placeholder="VIN Number" required
                            className="neon-input" value={formData.VIN} onChange={e => setFormData({ ...formData, VIN: e.target.value })} />
                        <input type="text" placeholder="License Plate" required
                            className="neon-input" value={formData.licensePlate} onChange={e => setFormData({ ...formData, licensePlate: e.target.value })} />
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="Manufacturer" required
                                className="neon-input" value={formData.manufacturer} onChange={e => setFormData({ ...formData, manufacturer: e.target.value })} />
                            <input type="text" placeholder="Model" required
                                className="neon-input" value={formData.model} onChange={e => setFormData({ ...formData, model: e.target.value })} />
                        </div>
                        <input type="number" placeholder="Year" required
                            className="neon-input" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} />

                        <button type="submit" className="neon-button w-full mt-4">
                            ENGAGE REGISTRATION
                        </button>
                    </form>
                </div>

                {/* Data Table */}
                <div className="glass-card p-6 lg:col-span-2 overflow-x-auto">
                    <h3 className="text-xl font-bold text-white mb-6">Registered Assets Log</h3>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-glassBorder text-gray-400 text-sm">
                                <th className="pb-3 px-4 font-medium tracking-wider">ID</th>
                                <th className="pb-3 px-4 font-medium tracking-wider">VIN</th>
                                <th className="pb-3 px-4 font-medium tracking-wider">PLATE</th>
                                <th className="pb-3 px-4 font-medium tracking-wider">MAKE / MODEL</th>
                                <th className="pb-3 px-4 font-medium tracking-wider">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map((v, i) => (
                                <motion.tr
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={v._id}
                                    className="border-b border-glassBorder/30 hover:bg-glassBg/50 transition-colors"
                                >
                                    <td className="py-4 px-4 text-neonCyan font-mono text-sm">{v.vehicleId}</td>
                                    <td className="py-4 px-4 text-gray-300 tracking-wider text-sm">{v.VIN}</td>
                                    <td className="py-4 px-4 text-white font-semibold">{v.licensePlate}</td>
                                    <td className="py-4 px-4 text-gray-400">{v.manufacturer} {v.model} ({v.year})</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${v.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {v.status.toUpperCase()}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                            {vehicles.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="py-8 text-center text-gray-500">No assets detected in network.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
};

export default VehicleManagement;

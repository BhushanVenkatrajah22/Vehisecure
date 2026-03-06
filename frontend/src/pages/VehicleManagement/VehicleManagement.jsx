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
            <div className="flex justify-between items-center border-b border-cyberBlue/50 pb-4">
                <div>
                    <h2 className="text-2xl font-black font-mono tracking-[0.2em] text-cyberBlue drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">ASSET DATABASE</h2>
                    <p className="text-slate-400 font-mono text-xs mt-2 tracking-widest">VEHICLE CLASSIFICATION PROTOCOL</p>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* Registration Form */}
                <div className="cyber-panel p-6 xl:col-span-1 h-fit relative">
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyberBlue/30 m-2 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyberBlue/30 m-2 pointer-events-none"></div>

                    <h3 className="text-lg font-bold font-mono text-white mb-6 tracking-widest flex items-center gap-3">
                        <span className="w-2 h-2 bg-cyberBlue animate-pulse"></span>
                        INITIALIZE ASSET
                    </h3>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-cyberBlue">SYSTEM REGISTRY ID [REQUIRED]</label>
                            <input type="text" placeholder="VH-XXXX" required
                                className="cyber-input" value={formData.vehicleId} onChange={e => setFormData({ ...formData, vehicleId: e.target.value })} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-cyberBlue">VEHICLE IDENTIFICATION NUMBER [VIN]</label>
                            <input type="text" placeholder="17-CHAR ALPHANUMERIC" required
                                className="cyber-input uppercase" value={formData.VIN} onChange={e => setFormData({ ...formData, VIN: e.target.value })} />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-cyberBlue">LICENSE DESIGNATION</label>
                            <input type="text" placeholder="PLATE DATA" required
                                className="cyber-input uppercase" value={formData.licensePlate} onChange={e => setFormData({ ...formData, licensePlate: e.target.value })} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono tracking-widest text-cyberBlue">MANUFACTURER</label>
                                <input type="text" placeholder="CORP." required
                                    className="cyber-input" value={formData.manufacturer} onChange={e => setFormData({ ...formData, manufacturer: e.target.value })} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-mono tracking-widest text-cyberBlue">MODEL</label>
                                <input type="text" placeholder="BUILD" required
                                    className="cyber-input" value={formData.model} onChange={e => setFormData({ ...formData, model: e.target.value })} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-cyberBlue">MANUFACTURE YEAR CYCLE</label>
                            <input type="number" placeholder="YYYY" required
                                className="cyber-input" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} />
                        </div>

                        <button type="submit" className="cyber-button w-full mt-8">
                            [ REGISTER_ENTITY ]
                        </button>
                    </form>
                </div>

                {/* Data Table */}
                <div className="cyber-panel xl:col-span-2 overflow-hidden flex flex-col relative">
                    <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-cyberBlue/10 via-cyberBlue/30 to-cyberBlue/10"></div>

                    <div className="p-5 border-b border-slate-700/50 bg-slate-900/60 flex justify-between items-center">
                        <h3 className="text-sm font-bold font-mono tracking-widest text-white">ASSET_INDEX_LATEST</h3>
                        <div className="text-[10px] font-mono text-neonGreen flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-neonGreen animate-pulse"></span>
                            LIVE SYNC
                        </div>
                    </div>

                    <div className="overflow-x-auto flex-1 p-1">
                        <table className="w-full text-left font-mono">
                            <thead>
                                <tr className="text-cyberBlue/80 text-[10px] uppercase tracking-widest border-b border-slate-800">
                                    <th className="py-4 px-4 font-normal">SYS_ID</th>
                                    <th className="py-4 px-4 font-normal">SERIAL / VIN</th>
                                    <th className="py-4 px-4 font-normal">IDENT</th>
                                    <th className="py-4 px-4 font-normal">BUILD</th>
                                    <th className="py-4 px-4 font-normal text-center">NET_STAT</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800/60">
                                {vehicles.map((v, i) => (
                                    <motion.tr
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={v._id}
                                        className="hover:bg-cyberBlue/5 transition-colors group"
                                    >
                                        <td className="py-4 px-4 whitespace-nowrap">
                                            <span className="text-xs text-cyberBlue drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">{v.vehicleId}</span>
                                        </td>
                                        <td className="py-4 px-4 whitespace-nowrap text-[11px] text-slate-400 font-mono tracking-wider">{v.VIN}</td>
                                        <td className="py-4 px-4 whitespace-nowrap font-bold text-white tracking-widest">{v.licensePlate}</td>
                                        <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-300">{v.manufacturer.toUpperCase()} {v.model.toUpperCase()} <span className="text-[10px] ml-1 text-cyberBlue/50">[{v.year}]</span></td>
                                        <td className="py-4 px-4 whitespace-nowrap text-center">
                                            <span className={`inline-flex items-center px-2 py-1 border text-[10px] tracking-widest ${v.status === 'active' ? 'border-neonGreen/50 text-neonGreen bg-neonGreen/10 shadow-[0_0_10px_rgba(5,150,105,0.2)]' : 'border-alertRed/50 text-alertRed bg-alertRed/10 shadow-[0_0_10px_rgba(225,29,72,0.2)]'}`}>
                                                {v.status === 'active' ? 'ONLINE' : 'BLOCKED'}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                                {vehicles.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="py-16 text-center text-slate-500 font-mono text-sm tracking-widest">
                                            NO_ASSETS_FOUND
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

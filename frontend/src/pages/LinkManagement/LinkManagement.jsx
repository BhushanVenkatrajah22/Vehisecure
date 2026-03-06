import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link2 } from 'lucide-react';

const LinkManagement = () => {
    const [vehicles, setVehicles] = useState([]);
    const [owners, setOwners] = useState([]);
    const [insurances, setInsurances] = useState([]);

    const [ownerLinkData, setOwnerLinkData] = useState({ vehicleId: '', ownerObjectId: '' });
    const [insuranceLinkData, setInsuranceLinkData] = useState({ vehicleId: '', insuranceObjectId: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [vRes, oRes, iRes] = await Promise.all([
                    axios.get('http://localhost:5000/vehicle/all'),
                    axios.get('http://localhost:5000/owner/all'),
                    axios.get('http://localhost:5000/insurance/all')
                ]);
                setVehicles(vRes.data.data);
                setOwners(oRes.data.data);
                setInsurances(iRes.data.data);
            } catch (error) {
                console.error('Error fetching data for links:', error);
            }
        };
        fetchData();
    }, []);

    const handleLinkOwner = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/link/vehicle-owner', ownerLinkData);
            alert('Vehicle linked to Owner successfully');
            setOwnerLinkData({ vehicleId: '', ownerObjectId: '' });
        } catch (error) {
            alert(error.response?.data?.message || 'Error linking owner');
        }
    };

    const handleLinkInsurance = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/link/vehicle-insurance', insuranceLinkData);
            alert('Vehicle linked to Insurance successfully');
            setInsuranceLinkData({ vehicleId: '', insuranceObjectId: '' });
        } catch (error) {
            alert(error.response?.data?.message || 'Error linking insurance');
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-neonCyan to-electricBlue">Entity Liaison Protocol</h2>
                <p className="text-gray-400 mt-2 tracking-widest text-sm">ESTABLISH SECURE CONNECTIONS BETWEEN DATA NODES</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Link Owner */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card p-8 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                        <Link2 size={100} className="text-purple-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-6 relative z-10 flex items-center gap-3">
                        <span className="w-2 h-8 bg-purple-500 rounded-full inline-block shadow-[0_0_10px_#a855f7]"></span>
                        Bind Personnel to Asset
                    </h3>

                    <form className="space-y-6 relative z-10" onSubmit={handleLinkOwner}>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-mono">Select Target Asset (Vehicle)</label>
                            <select required className="neon-input focus:ring-purple-500 focus:border-purple-500 bg-deepBlue"
                                value={ownerLinkData.vehicleId} onChange={e => setOwnerLinkData({ ...ownerLinkData, vehicleId: e.target.value })}>
                                <option value="" disabled>-- Select Vehicle --</option>
                                {vehicles.map(v => (
                                    <option key={v._id} value={v._id}>{v.vehicleId} - {v.licensePlate}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-mono">Select Target Personnel (Owner)</label>
                            <select required className="neon-input focus:ring-purple-500 focus:border-purple-500 bg-deepBlue"
                                value={ownerLinkData.ownerObjectId} onChange={e => setOwnerLinkData({ ...ownerLinkData, ownerObjectId: e.target.value })}>
                                <option value="" disabled>-- Select Owner --</option>
                                {owners.map(o => (
                                    <option key={o._id} value={o._id}>{o.ownerId} - {o.name}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="w-full relative overflow-hidden bg-purple-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] hover:bg-opacity-90 active:scale-95 mt-4 tracking-widest">
                            INITIALIZE BINDING
                        </button>
                    </form>
                </motion.div>

                {/* Link Insurance */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-8 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                        <Link2 size={100} className="text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-6 relative z-10 flex items-center gap-3">
                        <span className="w-2 h-8 bg-emerald-500 rounded-full inline-block shadow-[0_0_10px_#10b981]"></span>
                        Bind Policy to Asset
                    </h3>

                    <form className="space-y-6 relative z-10" onSubmit={handleLinkInsurance}>
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-mono">Select Target Asset (Vehicle)</label>
                            <select required className="neon-input focus:ring-emerald-500 focus:border-emerald-500 bg-deepBlue"
                                value={insuranceLinkData.vehicleId} onChange={e => setInsuranceLinkData({ ...insuranceLinkData, vehicleId: e.target.value })}>
                                <option value="" disabled>-- Select Vehicle --</option>
                                {vehicles.map(v => (
                                    <option key={v._id} value={v._id}>{v.vehicleId} - {v.licensePlate}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 font-mono">Select Target Policy (Insurance)</label>
                            <select required className="neon-input focus:ring-emerald-500 focus:border-emerald-500 bg-deepBlue"
                                value={insuranceLinkData.insuranceObjectId} onChange={e => setInsuranceLinkData({ ...insuranceLinkData, insuranceObjectId: e.target.value })}>
                                <option value="" disabled>-- Select Insurance --</option>
                                {insurances.map(i => (
                                    <option key={i._id} value={i._id}>{i.policyNumber} - {i.provider}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="w-full relative overflow-hidden bg-emerald-600 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:bg-opacity-90 active:scale-95 mt-4 tracking-widest">
                            INITIALIZE BINDING
                        </button>
                    </form>
                </motion.div>

            </div>
        </div>
    );
};

export default LinkManagement;

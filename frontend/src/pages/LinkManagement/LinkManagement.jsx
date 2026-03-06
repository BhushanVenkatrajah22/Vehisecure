import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link2, Network } from 'lucide-react';

const LinkManagement = () => {
    const [vehicles,setVehicles] = useState([]);
    const [owners,setOwners] = useState([]);
    const [insurances,setInsurances] = useState([]);

    const [ownerLinkData,setOwnerLinkData] = useState({ vehicleId: '', ownerObjectId: '' });
    const [insuranceLinkData,setInsuranceLinkData] = useState({ vehicleId: '', insuranceObjectId: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [vRes,oRes,iRes] = await Promise.all([
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
        <div className="space-y-12 max-w-5xl mx-auto mt-8 relative z-10">
            <div className="text-center relative">
                <div className="absolute left-1/2 -ml-[150px] -top-10 w-[300px] h-[300px] bg-neonPink/20 blur-[100px] rounded-full pointer-events-none -z-10 mix-blend-screen"></div>
                <h2 className="text-5xl font-black font-display tracking-tight text-gradient-secondary mb-4 drop-shadow-md">
                    Data Matrix Linkage
                </h2>
                <p className="text-white/60 font-medium text-lg max-w-xl mx-auto">
                    Establish secure cryptographic bonds between isolated database entities across the network.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Link Owner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="vibrant-glass p-8 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neonYellow/30 blur-[40px] rounded-full group-hover:bg-neonYellow/50 transition-colors"></div>

                    <h3 className="text-2xl font-bold font-display text-white mb-8 flex items-center gap-3 relative z-10">
                        <div className="p-3 bg-neonYellow/10 rounded-xl text-neonYellow shadow-[0_0_15px_rgba(251,255,0,0.3)]">
                            <Network size={24} />
                        </div>
                        Bind Personnel Node
                    </h3>

                    <form className="space-y-6 relative z-10" onSubmit={handleLinkOwner}>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">Select Asset Focus</label>
                            <select required className="vibrant-input appearance-none [&>option]:text-black focus:border-neonYellow focus:ring-neonYellow/50"
                                value={ownerLinkData.vehicleId} onChange={e => setOwnerLinkData({ ...ownerLinkData, vehicleId: e.target.value })}>
                                <option value="" disabled>-- Target Vehicle Node --</option>
                                {vehicles.map(v => (
                                    <option key={v._id} value={v._id}>[{v.vehicleId}] {v.manufacturer} {v.model}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">Select Authorized Node</label>
                            <select required className="vibrant-input appearance-none [&>option]:text-black focus:border-neonYellow focus:ring-neonYellow/50"
                                value={ownerLinkData.ownerObjectId} onChange={e => setOwnerLinkData({ ...ownerLinkData, ownerObjectId: e.target.value })}>
                                <option value="" disabled>-- Target Owner Node --</option>
                                {owners.map(o => (
                                    <option key={o._id} value={o._id}>[{o.ownerId}] {o.name}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn-neon-yellow w-full flex items-center justify-center gap-3 mt-8">
                            <Link2 size={20} className="group-hover:rotate-45 transition-transform" />
                            Initialize Bond
                        </button>
                    </form>
                </motion.div>

                {/* Link Insurance */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="vibrant-glass p-8 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-neonPink/30 blur-[40px] rounded-full group-hover:bg-neonPink/50 transition-colors"></div>

                    <h3 className="text-2xl font-bold font-display text-white mb-8 flex items-center gap-3 relative z-10">
                        <div className="p-3 bg-neonPink/10 rounded-xl text-neonPink shadow-[0_0_15px_rgba(255,0,127,0.3)]">
                            <Network size={24} />
                        </div>
                        Bind Security Node
                    </h3>

                    <form className="space-y-6 relative z-10" onSubmit={handleLinkInsurance}>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">Select Asset Focus</label>
                            <select required className="vibrant-input appearance-none [&>option]:text-black focus:border-neonPink focus:ring-neonPink/50"
                                value={insuranceLinkData.vehicleId} onChange={e => setInsuranceLinkData({ ...insuranceLinkData, vehicleId: e.target.value })}>
                                <option value="" disabled>-- Target Vehicle Node --</option>
                                {vehicles.map(v => (
                                    <option key={v._id} value={v._id}>[{v.vehicleId}] {v.manufacturer} {v.model}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-white/70 uppercase tracking-widest pl-2">Select Policy Payload</label>
                            <select required className="vibrant-input appearance-none [&>option]:text-black focus:border-neonPink focus:ring-neonPink/50"
                                value={insuranceLinkData.insuranceObjectId} onChange={e => setInsuranceLinkData({ ...insuranceLinkData, insuranceObjectId: e.target.value })}>
                                <option value="" disabled>-- Target Policy Node --</option>
                                {insurances.map(i => (
                                    <option key={i._id} value={i._id}>[{i.policyNumber}] {i.provider}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn-neon-pink w-full flex items-center justify-center gap-3 mt-8">
                            <Link2 size={20} className="group-hover:rotate-45 transition-transform" />
                            Initialize Bond
                        </button>
                    </form>
                </motion.div>

            </div>
        </div>
    );
};

export default LinkManagement;

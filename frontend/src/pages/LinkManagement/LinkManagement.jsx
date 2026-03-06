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
        <div className="space-y-8 max-w-5xl mx-auto mt-6">
            <div className="text-center mb-12 relative">
                <div className="absolute left-1/2 -ml-[250px] top-1/2 -mt-[50px] w-[500px] h-[100px] bg-cyberBlue/20 blur-[80px] rounded-full pointer-events-none -z-10 mix-blend-screen"></div>
                <h2 className="text-4xl font-black font-mono tracking-[0.3em] text-cyberBlue drop-shadow-glow-cyan mb-2">ENTITY RELAY LIAISON</h2>
                <p className="text-slate-400 font-mono text-xs tracking-[0.2em]">[ ESTABLISH SECURE DATALINKS BETWEEN TARGET NODES ]</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Link Owner */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="cyber-panel overflow-hidden relative group"
                >
                    {/* Holographic background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-deepPurple/10 to-transparent z-0"></div>

                    <div className="p-6 border-b border-deepPurple/30 bg-slate-900/60 flex items-center justify-between relative z-10">
                        <h3 className="text-sm font-bold font-mono tracking-widest text-white flex items-center gap-3">
                            <span className="w-1.5 h-6 bg-deepPurple shadow-glow-purple"></span>
                            BIND_PERSONNEL
                        </h3>
                        <div className="flex gap-1">
                            <span className="w-1 h-1 bg-deepPurple/50 rounded-full animate-ping"></span>
                            <span className="w-1 h-1 bg-deepPurple/50 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-1 h-1 bg-deepPurple/50 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                    </div>

                    <form className="p-8 space-y-6 relative z-10" onSubmit={handleLinkOwner}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-deepPurple">SELECT TARGET ASSET [VEHICLE]</label>
                            <select required className="cyber-input appearance-none bg-slate-900/80 focus:border-deepPurple focus:ring-deepPurple"
                                value={ownerLinkData.vehicleId} onChange={e => setOwnerLinkData({ ...ownerLinkData, vehicleId: e.target.value })}>
                                <option value="" disabled>-- [ AWAITING INPUT ] --</option>
                                {vehicles.map(v => (
                                    <option key={v._id} value={v._id}>SYS: {v.vehicleId} // IDENT: {v.licensePlate}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-deepPurple">SELECT TARGET PERSONNEL [OWNER]</label>
                            <select required className="cyber-input appearance-none bg-slate-900/80 focus:border-deepPurple focus:ring-deepPurple"
                                value={ownerLinkData.ownerObjectId} onChange={e => setOwnerLinkData({ ...ownerLinkData, ownerObjectId: e.target.value })}>
                                <option value="" disabled>-- [ AWAITING INPUT ] --</option>
                                {owners.map(o => (
                                    <option key={o._id} value={o._id}>ID: {o.ownerId} // NAME: {o.name.toUpperCase()}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="cyber-button w-full mt-6 !text-deepPurple !border-deepPurple/50 hover:!bg-deepPurple/20 hover:!text-white hover:!shadow-glow-purple group">
                            <span className="flex items-center justify-center gap-3">
                                <Link2 size={16} className="group-hover:rotate-45 transition-transform" />
                                [ EXECUTE BINDING ]
                            </span>
                        </button>
                    </form>
                </motion.div>

                {/* Link Insurance */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="cyber-panel overflow-hidden relative group"
                >
                    {/* Holographic background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neonGreen/10 to-transparent z-0"></div>

                    <div className="p-6 border-b border-neonGreen/30 bg-slate-900/60 flex items-center justify-between relative z-10">
                        <h3 className="text-sm font-bold font-mono tracking-widest text-white flex items-center gap-3">
                            <span className="w-1.5 h-6 bg-neonGreen shadow-[0_0_10px_rgba(5,150,105,0.8)]"></span>
                            BIND_POLICY
                        </h3>
                        <div className="flex gap-1 border border-neonGreen/30 px-2 py-0.5 rounded text-[8px] font-mono text-neonGreen tracking-widest">
                            <span className="animate-pulse">SECURE</span>
                        </div>
                    </div>

                    <form className="p-8 space-y-6 relative z-10" onSubmit={handleLinkInsurance}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-neonGreen">SELECT TARGET ASSET [VEHICLE]</label>
                            <select required className="cyber-input appearance-none bg-slate-900/80 focus:border-neonGreen focus:ring-neonGreen"
                                value={insuranceLinkData.vehicleId} onChange={e => setInsuranceLinkData({ ...insuranceLinkData, vehicleId: e.target.value })}>
                                <option value="" disabled>-- [ AWAITING INPUT ] --</option>
                                {vehicles.map(v => (
                                    <option key={v._id} value={v._id}>SYS: {v.vehicleId} // IDENT: {v.licensePlate}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-mono tracking-widest text-neonGreen">SELECT TARGET POLICY [INSURANCE]</label>
                            <select required className="cyber-input appearance-none bg-slate-900/80 focus:border-neonGreen focus:ring-neonGreen"
                                value={insuranceLinkData.insuranceObjectId} onChange={e => setInsuranceLinkData({ ...insuranceLinkData, insuranceObjectId: e.target.value })}>
                                <option value="" disabled>-- [ AWAITING INPUT ] --</option>
                                {insurances.map(i => (
                                    <option key={i._id} value={i._id}>POL: {i.policyNumber} // TIER: {i.coverageType.toUpperCase()}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="cyber-button w-full mt-6 !text-neonGreen !border-neonGreen/50 hover:!bg-neonGreen/20 hover:!text-white hover:!shadow-[0_0_15px_rgba(5,150,105,0.5)] group">
                            <span className="flex items-center justify-center gap-3">
                                <Link2 size={16} className="group-hover:rotate-45 transition-transform" />
                                [ EXECUTE BINDING ]
                            </span>
                        </button>
                    </form>
                </motion.div>

            </div>
        </div>
    );
};

export default LinkManagement;

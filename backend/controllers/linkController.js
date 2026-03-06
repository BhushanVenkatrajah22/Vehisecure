const Vehicle = require('../models/Vehicle');
const Owner = require('../models/Owner');
const Insurance = require('../models/Insurance');

// Link vehicle to owner
exports.linkVehicleOwner = async (req, res) => {
    try {
        const { vehicleId, ownerObjectId } = req.body; // Using mongo ObjectIds normally, or custom IDs

        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) return res.status(404).json({ success: false, message: 'Vehicle not found' });

        const owner = await Owner.findById(ownerObjectId);
        if (!owner) return res.status(404).json({ success: false, message: 'Owner not found' });

        vehicle.owner = owner._id;
        await vehicle.save();

        res.status(200).json({ success: true, message: 'Vehicle linked to owner successfully', data: vehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Link vehicle to insurance
exports.linkVehicleInsurance = async (req, res) => {
    try {
        const { vehicleId, insuranceObjectId } = req.body;

        const vehicle = await Vehicle.findById(vehicleId);
        if (!vehicle) return res.status(404).json({ success: false, message: 'Vehicle not found' });

        const insurance = await Insurance.findById(insuranceObjectId);
        if (!insurance) return res.status(404).json({ success: false, message: 'Insurance not found' });

        vehicle.insurance = insurance._id;
        await vehicle.save();

        res.status(200).json({ success: true, message: 'Vehicle linked to insurance successfully', data: vehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

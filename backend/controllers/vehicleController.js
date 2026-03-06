const Vehicle = require('../models/Vehicle');
const Owner = require('../models/Owner');
const Insurance = require('../models/Insurance');

// Register a new vehicle
exports.registerVehicle = async (req, res) => {
    try {
        const { vehicleId, VIN, licensePlate, manufacturer, model, year, status } = req.body;

        // Check if vehicle exists
        let vehicle = await Vehicle.findOne({ $or: [{ vehicleId }, { VIN }, { licensePlate }] });
        if (vehicle) {
            return res.status(400).json({ success: false, message: 'Vehicle already exists' });
        }

        vehicle = await Vehicle.create({
            vehicleId, VIN, licensePlate, manufacturer, model, year, status
        });

        res.status(201).json({ success: true, data: vehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find().populate('owner').populate('insurance');
        res.status(200).json({ success: true, data: vehicles });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single vehicle
exports.getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id).populate('owner').populate('insurance');
        if (!vehicle) {
            return res.status(404).json({ success: false, message: 'Vehicle not found' });
        }
        res.status(200).json({ success: true, data: vehicle });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete vehicle
exports.deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ success: false, message: 'Vehicle not found' });
        }
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

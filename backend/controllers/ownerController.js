const Owner = require('../models/Owner');

// Register Owner
exports.registerOwner = async (req, res) => {
    try {
        const { ownerId, name, email, phone, address, driverLicenseNumber } = req.body;

        let owner = await Owner.findOne({ $or: [{ ownerId }, { email }, { driverLicenseNumber }] });
        if (owner) {
            return res.status(400).json({ success: false, message: 'Owner already exists' });
        }

        owner = await Owner.create({
            ownerId, name, email, phone, address, driverLicenseNumber
        });

        res.status(201).json({ success: true, data: owner });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all owners
exports.getAllOwners = async (req, res) => {
    try {
        const owners = await Owner.find();
        res.status(200).json({ success: true, data: owners });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

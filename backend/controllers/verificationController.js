const Vehicle = require('../models/Vehicle');

exports.verifyVehicle = async (req, res) => {
    try {
        // vehicleId can be the custom ID or the mongo _id. We'll check the custom vehicleId.
        const { vehicleId } = req.body;

        if (!vehicleId) {
            return res.status(400).json({ success: false, message: 'Please provide vehicleId' });
        }

        // 1: Check vehicle exists
        const vehicle = await Vehicle.findOne({ vehicleId }).populate('owner').populate('insurance');

        if (!vehicle) {
            return res.status(200).json({ status: 'Rejected', reason: 'Vehicle does not exist' });
        }

        // 2: Check vehicle has owner
        if (!vehicle.owner) {
            return res.status(200).json({ status: 'Rejected', reason: 'Vehicle has no registered owner' });
        }

        // 3: Check vehicle has insurance
        if (!vehicle.insurance) {
            return res.status(200).json({ status: 'Rejected', reason: 'Vehicle has no registered insurance' });
        }

        // 4: Check insurance expiry
        const now = new Date();
        if (new Date(vehicle.insurance.validTill) < now || vehicle.insurance.status !== 'active') {
            return res.status(200).json({ status: 'Rejected', reason: 'Vehicle insurance is expired or inactive' });
        }

        // 5: Check vehicle status
        if (vehicle.status !== 'active') {
            return res.status(200).json({ status: 'Rejected', reason: 'Vehicle status is blocked' });
        }

        // Return Authorized
        return res.status(200).json({ status: 'Authorized', data: vehicle });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

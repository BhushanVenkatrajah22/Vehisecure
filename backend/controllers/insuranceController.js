const Insurance = require('../models/Insurance');

// Add Insurance
exports.addInsurance = async (req, res) => {
    try {
        const { policyNumber, provider, validFrom, validTill, coverageType, status } = req.body;

        let insurance = await Insurance.findOne({ policyNumber });
        if (insurance) {
            return res.status(400).json({ success: false, message: 'Insurance policy already exists' });
        }

        insurance = await Insurance.create({
            policyNumber, provider, validFrom, validTill, coverageType, status
        });

        res.status(201).json({ success: true, data: insurance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all insurances
exports.getAllInsurances = async (req, res) => {
    try {
        const insurances = await Insurance.find();
        res.status(200).json({ success: true, data: insurances });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

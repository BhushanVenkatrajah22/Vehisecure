const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleId: {
        type: String,
        required: true,
        unique: true
    },
    VIN: {
        type: String,
        required: true,
        unique: true
    },
    licensePlate: {
        type: String,
        required: true,
        unique: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Owner',
        default: null
    },
    insurance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Insurance',
        default: null
    }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);

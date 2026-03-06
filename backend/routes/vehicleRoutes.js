const express = require('express');
const { registerVehicle, getAllVehicles, getVehicleById, deleteVehicle } = require('../controllers/vehicleController');

const router = express.Router();

router.route('/register').post(registerVehicle);
router.route('/all').get(getAllVehicles);
router.route('/:id').get(getVehicleById).delete(deleteVehicle);

module.exports = router;

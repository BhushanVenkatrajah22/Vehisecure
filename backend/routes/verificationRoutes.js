const express = require('express');
const { verifyVehicle } = require('../controllers/verificationController');

const router = express.Router();

router.route('/').post(verifyVehicle);

module.exports = router;

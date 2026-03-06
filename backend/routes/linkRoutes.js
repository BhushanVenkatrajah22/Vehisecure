const express = require('express');
const { linkVehicleOwner, linkVehicleInsurance } = require('../controllers/linkController');

const router = express.Router();

router.route('/vehicle-owner').post(linkVehicleOwner);
router.route('/vehicle-insurance').post(linkVehicleInsurance);

module.exports = router;

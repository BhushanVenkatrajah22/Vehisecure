const express = require('express');
const { addInsurance, getAllInsurances } = require('../controllers/insuranceController');

const router = express.Router();

router.route('/add').post(addInsurance);
router.route('/all').get(getAllInsurances);

module.exports = router;

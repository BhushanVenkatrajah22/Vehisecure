const express = require('express');
const { registerOwner, getAllOwners } = require('../controllers/ownerController');

const router = express.Router();

router.route('/register').post(registerOwner);
router.route('/all').get(getAllOwners);

module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('./reg-ctrl');

router.post('/insert_aadhar', controller.insertAadhar);
router.get('/search_adhars', controller.searchAadharUsers);

module.exports = router;



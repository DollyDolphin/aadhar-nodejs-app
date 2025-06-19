const express = require('express');
const router = express.Router();
const controller = require('./dash-ctrl');

router.get('/state_wise_adhar_count_above_60', controller.stateWiseCountAbove60);
router.get('/state_city_wise_adhar_users', controller.stateCityWiseAadharUsers);
router.get('/top_states_aadhar_count', controller.topStatesByCount);



module.exports = router;

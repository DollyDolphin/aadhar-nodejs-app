const express = require('express');
const router = express.Router();

console.log('Loading reg-routes...');
router.use('/', require('./registration/reg-routes'));

console.log('Loading dash-routes...');
router.use('/', require('./dashboard/dash-routes'));

console.log('Loading profile-routes...');
router.use('/', require('./profile/profile-routes'));

console.log('Loading cron-routes...');
router.use('/', require('./cron/cron-routes'));

module.exports = router;

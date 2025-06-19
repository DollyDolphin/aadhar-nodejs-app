const express = require('express');
const router = express.Router();

// Correct relative path to schedulers/cronServices.js
const { SendBirthdayWishesForAadharUsers } = require('../../schedulers/cronServices');

router.get('/test_birthday_emails', (req, res) => {
  SendBirthdayWishesForAadharUsers(); // manually trigger cron task
  res.json({ message: 'Birthday email function executed manually.' });
});

module.exports = router;

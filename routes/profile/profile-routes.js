const express = require('express');
const multer = require('multer');
const router = express.Router();
const controller = require('./profile-ctrl');

// Store files temporarily in /uploads before renaming
const upload = multer({ dest: 'uploads/' });

router.post('/upload_profile_picture', upload.single('profile'), controller.uploadProfilePicture);

module.exports = router;

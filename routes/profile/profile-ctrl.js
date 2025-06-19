const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const con = require('../../db');

exports.uploadProfilePicture = (req, res) => {
  const aadharNumber = req.body.aadhar_number;
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'No file uploaded' });

  const fileExtension = path.extname(file.originalname);
  const fileName = `${uuidv4()}${fileExtension}`;
  const uploadPath = path.join(__dirname, '../../uploads', fileName);

  fs.rename(file.path, uploadPath, (err) => {
    if (err) return res.status(500).json({ error: 'File saving failed' });

    const relativePath = `/uploads/${fileName}`;

    const sql = `UPDATE aadhar_users SET profile_picture = ? WHERE aadhar_number = ?`;
    con.query(sql, [relativePath, aadharNumber], (err, result) => {
      if (err) return res.status(500).json({ error: 'Database update failed' });

      res.status(200).json({
        data: {
          message: 'Profile picture uploaded successfully',
          path: relativePath
        }
      });
    });
  });
};

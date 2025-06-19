const con = require('../../db');

exports.insertAadhar = (req, res) => {
  const data = req.body;
  const query = `INSERT INTO aadhar_users (first_name, last_name, dob, mobile_number, email_id, address, aadhar_number, city_id, state_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  con.query(query, [
    data.first_name,
    data.last_name,
    data.dob,
    data.mobile_number,
    data.email_id,
    data.address,
    data.aadhar_number,
    data.city_id,
    data.state_id
  ], (err, result) => {
    if (err) return res.status(500).json({ error: 'Insert failed' });
    res.json({ data: 'Aadhar inserted successfully' });
  });
};

exports.searchAadharUsers = (req, res) => {
  const { location, dob, gender, aadharNumber } = req.query;

  let query = `
    SELECT au.*, sm.state_name, cm.city_name
    FROM aadhar_users au
    LEFT JOIN state_master sm ON sm.tid = au.state_id
    LEFT JOIN city_master cm ON cm.tid = au.city_id
    WHERE 1 = 1
  `;
  const params = [];

  if (location) {
    query += ` AND (sm.state_name LIKE ? OR cm.city_name LIKE ?)`;
    params.push(`%${location}%`, `%${location}%`);
  }

  if (dob) {
    query += ` AND au.dob = ?`;
    params.push(dob);
  }

  if (gender) {
    query += ` AND au.gender = ?`;
    params.push(gender);
  }

  if (aadharNumber) {
    query += ` AND au.aadhar_number = ?`;
    params.push(aadharNumber);
  }

  con.query(query, params, (err, result) => {
    if (err) return res.status(500).json({ error: 'Search failed' });
    res.json({ data: { adharList: result } });
  });
};

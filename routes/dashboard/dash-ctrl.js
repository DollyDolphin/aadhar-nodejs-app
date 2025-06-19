const con = require('../../db');

exports.stateWiseCountAbove60 = (req, res) => {
  const query = `
    SELECT sm.state_name, COUNT(*) AS count_above_60
    FROM aadhar_users au
    JOIN state_master sm ON sm.tid = au.state_id
    WHERE TIMESTAMPDIFF(YEAR, au.dob, CURDATE()) > 60
    GROUP BY au.state_id
  `;

  con.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: 'Query failed' });
    res.json({ data: result });
  });
};

exports.stateCityWiseAadharUsers = (req, res) => {
  const query = `
    SELECT sm.state_name, cm.city_name, COUNT(*) AS user_count
    FROM aadhar_users au
    JOIN state_master sm ON sm.tid = au.state_id
    JOIN city_master cm ON cm.tid = au.city_id
    GROUP BY au.state_id, au.city_id
  `;

  con.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: 'Query failed' });
    res.json({ data: result });
  });
};


exports.topStatesByCount = (req, res) => {
  const query = `
    SELECT sm.state_name, COUNT(*) AS user_count
    FROM aadhar_users au
    JOIN state_master sm ON sm.tid = au.state_id
    GROUP BY sm.state_name
    ORDER BY user_count DESC
    LIMIT 5
  `;
  con.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: 'Query failed' });
    res.json({ data: result });
  });
};


const mysql = require('mysql2');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Chocofudge@30',
  database: 'aadhar'
});

con.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL DB');
});

module.exports = con;

const cron = require('node-cron');
const nodemailer = require('nodemailer');
const con = require('../db');
const env = require('../env.json');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.emailSender,
    pass: env.emailPassword
  }
});

function SendBirthdayWishesForAadharUsers() {
  const query = `SELECT first_name, email_id FROM aadhar_users WHERE DATE_FORMAT(dob, '%m-%d') = DATE_FORMAT(CURDATE(), '%m-%d')`;

  con.query(query, (err, users) => {
    if (err) return console.log('Error fetching birthdays', err);

    users.forEach((user) => {
      const mailOptions = {
        from: env.emailSender,
        to: user.email_id,
        subject: `Happy Birthday ${user.first_name}`,
        text: `Dear ${user.first_name},\n\nWish you a very happy birthday.\n\nBest wishes from TalentMicro.`
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(`Error sending to ${user.email_id}:`, err.message);
        } else {
          console.log(`Birthday mail sent to ${user.email_id}`);
        }
      });
    });
  });
}

// Run daily at 9 AM
cron.schedule('*/1 * * * *', () => {
  console.log('Running birthday cron job...');
  SendBirthdayWishesForAadharUsers();
});

module.exports = { SendBirthdayWishesForAadharUsers };

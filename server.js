// server.js
const express = require('express');
const app = express();
const mainRoutes = require('./routes/route'); // This must export a router

require('./schedulers/cronServices'); // start cron jobs

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/', mainRoutes);

app.listen(9000, () => {
  console.log('Server running on http://localhost:9000');
});

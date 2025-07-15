// db.js
require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false } // important for Railway SSL
});

db.connect(err => {
  if (err) {
    console.error('❌ DB Error:', err);
  } else {
    console.log('✅ MySQL Connected');
  }
});

module.exports = db;
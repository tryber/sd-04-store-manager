require('dotenv/config');

module.exports = {
  host: process.env.MONGO_DB_URL,
  database: process.env.DB_NAME,
  // user: process.env.DB_USER,
  // password: process.env.DB_PASS,
  // port: process.env.DB_PORT,
};

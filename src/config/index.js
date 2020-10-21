const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  databaseURL: process.env.MONGO_DB_URL,
  nameDB: process.env.DB_NAME,
  prodCollection: process.env.PROD_DB_COLLECTION,
  saleColletion: process.env.SALE_DB_COLLECTION,
};

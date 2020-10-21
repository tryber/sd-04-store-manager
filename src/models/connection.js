const mongoClient = require('mongodb').MongoClient;
const { databaseURL, nameDB } = require('../config');

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = () => {
  console.log(nameDB, databaseURL);
  return mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((_err) => {
      process.exit(1);
    });
};
module.exports = connection;

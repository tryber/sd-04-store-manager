const mongoClient = require('mongodb').MongoClient;

const DB_NAME = 'StoreManager';
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

const connection = () =>
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((_err) => {
      process.exit(1);
    });

module.exports = connection;

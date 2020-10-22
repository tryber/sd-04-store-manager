const mongoClient = require('mongodb').MongoClient;

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

/* const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager'; */

const DB_NAME = 'StoreManager';


const connection = () =>
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifieldTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => err);

module.exports = connection;

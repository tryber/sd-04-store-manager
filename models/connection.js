const mongoClient = require('mongodb').MongoClient;

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const connection = () =>
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db('StoreManager'))
    .catch(() => process.exit(1));

module.exports = connection;

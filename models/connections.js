const mongoClient = require('mongodb').MongoClient;

const DATABASE_NAME = 'StoreManager';
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const connection = () =>
  mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DATABASE_NAME))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });

module.exports = connection;

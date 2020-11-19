const mongoClient = require('mongodb').MongoClient;

// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// const DB_NAME = 'StoreManager';

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

let bdInstance;

const connection = async () => {
  try {
    if (bdInstance) {
      return Promise.resolve(bdInstance);
    }

    bdInstance = await mongoClient
      .connect(MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((conn) => conn.db(DB_NAME));
    return bdInstance;
  } catch (_) {
    process.exit(1);
  }
};

module.exports = connection;

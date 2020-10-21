const mongoClient = require('mongodb').MongoClient;
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = async () => {
  try {
    const session = await mongoClient
      .connect(MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    const database = await session.db(DB_NAME);
    return database;
  } catch (error) {
    return process.exit(1);
  }
};

module.exports = connection;

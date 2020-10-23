const { MongoClient } = require('mongodb');

// MongoDB local connection
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// const DB_NAME = 'StoreManager';

// MongoDB evaluator connection
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = async () => {
  try {
    const conn = await MongoClient.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const database = await conn.db(DB_NAME);

    return database;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connection;

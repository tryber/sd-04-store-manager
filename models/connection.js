const { MongoClient } = require('mongodb');

// // usar essa linha para testar local
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// const DB_NAME = 'StoreManager';

// usar essa linha para o evaluator do GitHub
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';

const connection = async () => {
  try {
    const conn = await MongoClient.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return conn.db(DB_NAME);
  } catch (_e) {
    throw new Error('DB connection failed');
  }
};

module.exports = connection;

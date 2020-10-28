const { MongoClient } = require('mongodb');

// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager'; // local
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager'; // evaluator
const DB_NAME = 'StoreManager';

let schema;

const connection = async () => {
  if (schema) return Promise.resolve(schema);
  try {
    const conn = await MongoClient.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    schema = conn.db(DB_NAME);
    return schema;
  } catch (_e) {
    throw new Error('DB connection failed');
  }
};

module.exports = connection;

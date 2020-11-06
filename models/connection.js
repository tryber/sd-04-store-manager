const { MongoClient } = require('mongodb');
require('dotenv').config();

const { DB_NAME } = process.env;
const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager';

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

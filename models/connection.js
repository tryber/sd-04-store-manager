require('dotenv/config');
const { MongoClient } = require('mongodb');

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = process.env.DB_NAME || 'StoreManager';

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

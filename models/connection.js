require('dotenv/config');

const mongoClient = require('mongodb');

const { MONGO_DB_URL, DB_NAME } = process.env;

const dburl = MONGO_DB_URL || 'mongodb://localhost:27017/StoreManager';
// const dburl = MONGO_DB_URL || 'mongodb://mongodb:27017/StoreManager';
const dbname = DB_NAME || 'StoreManager';

const connect = () =>
  mongoClient.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((connection) => connection.db(dbname));

module.exports = connect;

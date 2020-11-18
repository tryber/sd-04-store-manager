require('dotenv/config');

const mongoClient = require('mongodb');

const { MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager', DB_NAME = 'StoreManager' } = process.env;

const connect = () =>
  mongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then((connection) => connection.db(DB_NAME));

module.exports = connect;

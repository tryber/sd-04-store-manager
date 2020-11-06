const mongo = require('mongodb').MongoClient;

const DB_NAME = 'StoreManager';

const GIT_HUB_EVALUATOR = `mongodb://mongodb:27017/${DB_NAME}`;
const LOCALHOST = `mongodb://localhost:27017/${DB_NAME}`;

const EVALUATOR = true;

const MONGO_DB_URL = EVALUATOR ? GIT_HUB_EVALUATOR : LOCALHOST;

const connection = () =>
  mongo
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((client) => client.db(DB_NAME))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

module.exports = connection;

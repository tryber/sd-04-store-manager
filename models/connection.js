const mongoClient = require('mongodb').MongoClient;

const DB_NAME = 'StoreManager';

// usar essa linha para testar local
const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

// user essa linha para o evaluator do GitHub
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const connection = () => {
  return mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};

module.exports = connection;

const mongo = require('mongodb').MongoClient;

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager'; // usar essa linha para testar local
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager'; // usar essa linha para o evaluator do GitHub
const DB_NAME = 'StoreManager';

const connection = () => mongo
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

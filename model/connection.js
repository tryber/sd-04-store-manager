// A conexão do banco local devera conter os seguintes parâmetros:
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// const DB_NAME = 'StoreManager';

// Para o avaliador funcionar altere a conexão do banco para:
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// const DB_NAME = 'StoreManager';

const mongoClient = require('mongodb').MongoClient;

let schema = null;
const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
const DB_NAME = 'StoreManager';
async function connection() {
  if (schema) return Promise.resolve(schema);
  return mongoClient
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
module.exports = connection;

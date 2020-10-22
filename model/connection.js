const mongo = require('mongodb').MongoClient;

const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';

// PARA AVALIADOR UTILIZAR ESSA CONFIGURAÇÃO
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const DB_NAME = 'StoreManager';

function connection() {
  return mongo
    .connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => conn.db(DB_NAME))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
};
module.exports = connection;

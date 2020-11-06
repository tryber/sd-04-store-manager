// A conexão do banco local devera conter os seguintes parâmetros:
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager';
// const DB_NAME = 'StoreManager';

// Para o avaliador funcionar altere a conexão do banco para:
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';
// const DB_NAME = 'StoreManager';

const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

const connection = () =>
  MongoClient.connect(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then((connect) => connect.db('StoreManager'))
    .catch((err) => {
      console.error('err connect', err);
      process.exit(1);
    });

module.exports = connection;

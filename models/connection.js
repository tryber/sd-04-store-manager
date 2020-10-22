const { MongoClient } = require('mongodb');

const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager'; // evaluator
// const MONGO_DB_URL = 'mongodb://localhost:27017/StoreManager'; // local
const DB_NAME = 'StoreManager';

const connection = async () => {
  try {
    const conn = await MongoClient.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return conn.db(DB_NAME);
  } catch (_e) {
    throw new Error('DB connection failed');
  }
};

// connection = () =>
//   mongoClient
//     .connect(MONGO_DB_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then((conn) => conn.db('animaldb'))
//     .catch((err) => {
//       console.error(err);
//       process.exit(1);
//     });

module.exports = connection;

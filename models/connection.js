const mongoClient = require('mongodb').MongoClient;
// const { host, database } = require('./config');

const DB_NAME = 'StoreManager';

// Local
const MONGO_DB_URL =
  'mongodb://localhost:27017/StoreManager' ||
  'mongodb://mongodb:27017/StoreManager';

// Online
// const MONGO_DB_URL = 'mongodb://mongodb:27017/StoreManager';

let schema;
const connection = () =>
  (schema
    ? Promise.resolve(schema)
    : mongoClient.connect(
        MONGO_DB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      )
      .then((conn) => {
        schema = conn.db(DB_NAME);
        return schema;
      })
      .catch((_e) => process.exit(1))
  );

// const connection = () =>
//   mongoClient.connect(MONGO_DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((conn) => conn.db(DB_NAME))
//   .catch((_err) => process.exit(1));

module.exports = connection;

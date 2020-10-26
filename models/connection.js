const { host, database } = require('./config');
const mongoClient = require('mongodb').MongoClient;

let schema;
const connection = () =>
  (schema
    ? Promise.resolve(schema)
    : mongoClient.connect(
        host, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      )
      .then((conn) => conn.db(database))
      .catch((_err) => process.exit(1))
  );

module.exports = connection;

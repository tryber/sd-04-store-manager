const connection = require('./connection');

const create = async (collection, document) =>
  connection().then((db) => db.collection(collection).insertOne(document));

module.exports = { create };

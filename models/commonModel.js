const connection = require('./connection');

const getAll = async (collection) =>
  connection().then((db) => db.collection(collection).find().toArray());

module.exports = {
  getAll,
};

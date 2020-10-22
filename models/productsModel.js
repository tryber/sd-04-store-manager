const connection = require('./connection');

const getAll = async () =>
  connection().then((db) => db.collection('products').find({}).toArray());

module.exports = {
  getAll,
};

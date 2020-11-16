const connect = require('./connection');

const getAllProdutos = async () =>
  connect().then((db) => db.collection('products').find({}).toArray());

module.exports = {
  getAllProdutos,
};

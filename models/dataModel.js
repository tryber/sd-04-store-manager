const connection = require('./connection');

const cadastraProduto = async (obj) =>
  connection().then((db) => db.collection('products').insertOne(obj));

module.exports = {
  cadastraProduto,
};

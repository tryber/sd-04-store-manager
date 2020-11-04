const connection = require('./connection');

const getProductByName = async (name) => 
  connection().then((db) => db.collection('products').findOne({ name }));

const addProduct = async (name, quantity) =>
  connection().then((db) => db.collection('products').insertOne({ name, quantity }));

module.exports = {
  getProductByName,
  addProduct,
};

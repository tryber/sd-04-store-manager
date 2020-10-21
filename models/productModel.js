const connection = require('./connection');

const getAllProducts = async () =>
  connection().then((db) => db.collection('products').find().toArray());

const getProductByName = async (item) =>
  connection().then((db) => db.collection('products').findOne({ name: { $eq: item } }));

const addProduct = async (name, quantity) => {
  const result = connection().then((db) => db.collection('products').insertOne({ name, quantity }));
  return (await result).ops[0];
};

module.exports = {
  getAllProducts,
  getProductByName,
  addProduct,
};

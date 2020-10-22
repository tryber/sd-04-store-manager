const connection = require('./connection');
const { ObjectID } = require('mongodb');

const getAllProducts = async () =>
  connection().then((db) => db.collection('products').find().toArray());

const getProductById = async (item) => {
  if (!ObjectID.isValid(item)) return null;
  return connection().then((db) => db.collection('products').findOne(ObjectID(item)));
};

const getProductByName = async (item) =>
  connection().then((db) => db.collection('products').findOne({ name: { $eq: item } }));

const addProduct = async (name, quantity) => {
  const result = connection().then((db) => db.collection('products').insertOne({ name, quantity }));
  return (await result).ops[0];
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  addProduct,
};

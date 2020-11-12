const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addProduct = async (name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
  return result.ops[0];
};

const findByName = async (name) => {
  const result = await connection().then((db) => db.collection('products').findOne({ name }));
  return result;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
  return result;
};

const findAll = async () => {
  const allProducts = await connection().then((db) => db.collection('products').find().toArray());
  return allProducts;
};

module.exports = { addProduct, findByName, findAll, findById };

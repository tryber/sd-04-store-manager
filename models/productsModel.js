const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getProductByName = async (name) =>
  await connection().then((db) => db.collection('products').findOne({ name }));

const addProduct = async (name, quantity) =>
  await connection().then((db) => db.collection('products').insertOne({ name, quantity }));

const getAllProducts = async () =>
  await connection().then((db) => db.collection('products').find().toArray());

const getProductById = async (id) => {
  if (ObjectId.isValid(id)) {
    return connection().then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
  }

  return null;
};

const updateProduct = async (id, name, quantity) =>
  connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );

const deleteProduct = async (id) => {
  if (ObjectId.isValid(id)) {
    return connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
  }

  return null;
};

module.exports = {
  getProductByName,
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addProduct = async (name, quantity) =>
  connection().then((db) => db.collection('products').insertOne({ name, quantity }));

const getProductByName = async (name) =>
  connection().then((db) => db.collection('products').findOne({ name }));

const getAllProducts = async () =>
  connection().then((db) => db.collection('products').find().toArray());

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
  return result;
};

const updateProduct = async (id, name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
  return result;
};

const deleteProduct = async (id) => {
  if (ObjectId.isValid(id)) {
    return connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
  }

  return null;
};

const updateQuantity = async (id, quantity) =>
  connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $inc: { quantity: -quantity } }),
  );

module.exports = {
  getProductByName,
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateQuantity,
};

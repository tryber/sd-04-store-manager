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
  const result = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );
  return result.ops[0];
};

const updateProduct = async (id, name, quantity) =>
  connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectID(id) }, { $set: { name, quantity } }),
  );

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  addProduct,
  updateProduct,
};

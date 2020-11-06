const connection = require('./connection');
const { ObjectID } = require('mongodb');

const getAllProducts = async () => {
  const db = await connection();
  const allProd = await db.collection('products').find().toArray();
  return allProd;
};

const getProductById = async (item) => {
  if (!ObjectID.isValid(item)) return null;
  const db = await connection();
  const prod = db.collection('products').findOne(ObjectID(item));
  return prod;
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

const removeProduct = async (id) => {
  const db = await connection();
  const delProd = await db.collection('products').deleteOne({ _id: ObjectID(id) });
  return delProd;
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  addProduct,
  updateProduct,
  removeProduct,
};

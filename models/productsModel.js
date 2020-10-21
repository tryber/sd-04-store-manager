require('dotenv').config();
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getProducts = async () =>
  connection().then((db) => db.collection('products').find().toArray());

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const product = await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
  return product;
};

const getProductByName = async (name) => {
  const product = await connection().then((db) => db.collection('products').findOne({ name }));
  return product;
};

const addProduct = async (name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );

  return result.ops[0];
};

const updateProduct = async (id, name, quantity) => {
  if (!(await getProductById(id))) return false;
  await connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
  return true;
};

const removeProduct = async (id) => {
  if (!(await getProductById(id))) return false;
  await connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
  return true;
};

module.exports = {
  getProducts,
  getProductById,
  getProductByName,
  addProduct,
  updateProduct,
  removeProduct,
};

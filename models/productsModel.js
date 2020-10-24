const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => {
  const conn = await connection();
  return { products: await conn.collection('products').find().toArray() };
};

const getProductById = async (id) => {
  const conn = await connection();
  return conn.collection('products').findOne(ObjectId(id));
};

const getProductByName = async (name) => {
  const conn = await connection();
  return conn.collection('products').findOne({ name });
};

const insertProduct = async (name, quantity) => {
  const conn = await connection();
  const product = await conn.collection('products').insertOne({ name, quantity });
  return product.ops[0];
};

const updateProduct = async (id, name, quantity) => {
  const conn = await connection();
  const product = await conn
    .collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return product;
};

const deleteProduct = async (id) => {
  const conn = await connection();
  await conn.collection('products').deleteOne({ _id: ObjectId(id) });
  return true;
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  insertProduct,
  updateProduct,
  deleteProduct,
};

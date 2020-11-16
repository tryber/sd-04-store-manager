const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => {
  const db = await connection();
  const list = await db.collection('products').find().toArray();
  return list;
};

const findById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const item = await db.collection('products').findOne(ObjectId(id));
  return item;
};

const findByName = async (name) => {
  const db = await connection();
  const item = await db.collection('products').findOne({ name });
  return item;
};

const registerProducts = async (name, quantity) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  return newProduct.ops[0];
};

module.exports = {
  getAllProducts,
  findById,
  findByName,
  registerProducts,
};

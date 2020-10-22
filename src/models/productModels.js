const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerProduct = async (name, quantity) => {
  const db = await connection();
  const insertData = await db.collection('products').insertOne({ name, quantity });
  console.log('insertData', insertData);
  return insertData.ops[0];
};

const getProdByName = async (name) => {
  const db = await connection();
  const getProd = await db.collection('products').findOne({ name });
  return getProd;
};

const getProdById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const getProd = await db.collection('products').findOne(ObjectId(id));
  return getProd;
};

const getAllProducts = async () => {
  const db = await connection();
  const getArrayProducts = await db.collection('products').find().toArray();
  return getArrayProducts;
};

module.exports = {
  registerProduct,
  getProdByName,
  getAllProducts,
  getProdById,
};

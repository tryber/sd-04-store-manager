const connection = require('./connection');

const registerProduct = async (data) => {
  const db = await connection();
  const insertData = await db.collection('products').insertOne(data);
  return insertData.ops;
};

const getProdByName = async (name) => {
  const db = await connection();
  const getProd = await db.collection('products').findOne({ name });
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
};

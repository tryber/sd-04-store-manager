const connection = require('./connection');
const { prodCollection } = require('../config');

const getAllProducts = async () => {
  const db = await connection();
  const getArrayProducts = await db.collection(prodCollection).find().toArray();
  return getArrayProducts;
};

module.exports = {
  getAllProducts,
};

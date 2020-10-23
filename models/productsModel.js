const connection = require('./connection');

const getProductByName = async (name) => {
  const conn = await connection();
  return conn.collection('products').findOne({ name });
};

const insertProduct = async (name, quantity) => {
  const conn = await connection();
  const product = await conn.collection('products').insertOne({ name, quantity });

  return product.ops[0];
};

module.exports = {
  insertProduct,
  getProductByName,
};

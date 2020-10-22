const connection = require('./connection');
/* const { ObjectId } = require('mongodb'); */

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const getByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const add = async (name, quantity) => {
  try {
    const db = await connection();
    const addProduct = await db.collection('products').insertOne({ name, quantity });
    return addProduct.ops[0];
  } catch (err) {
    return null;
  }
};

module.exports = {
  getAll,
  getByName,
  add,
};

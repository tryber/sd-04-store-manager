const connection = require('./connection');

const addProduct = async (name, quantity) => {
  try {
    const db = await connection();
    const newProduct = await db.collection('products').insertOne({ name, quantity });
    return newProduct.ops[0];
  } catch (err) {
    console.error(err);
  }
};

const listProducts = async () => {
  try {
    const db = await connection();
    return await db.collection('products').find({}).toArray();
  } catch (err) {
    console.error(err);
    return [];
  }
};

module.exports = { addProduct, listProducts };

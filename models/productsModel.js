const connection = require('./connection');

const insertProdMod = async (name, quantity) => {
  try {
    const db = await connection();
    const result = await db.collection('products').insertOne({ name, quantity });
    return result;
  } catch (_e) {
    throw new Error('productRegistration connection failed');
  }
};

const getAllProdMod = async () => {
  const db = await connection();
  const products = await db.collection('products').find({}).toArray();

  return products;
};

module.exports = {
  insertProdMod,
  getAllProdMod,
};

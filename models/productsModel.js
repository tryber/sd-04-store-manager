const connection = require('./connection');

const insertProdMod = async (name, quantity) => {
  try {
    const db = await connection();
    const insertProd = await db.collection('products').insertOne({ name, quantity });
    const { insertedId: _id } = insertProd;
    const result = { _id, name, quantity };
    return result;
  } catch (_e) {
    throw new Error('productRegistration connection failed');
  }
};

const validateNameMod = async (name) => {
  try {
    const db = await connection();
    const findNameProd = await db.collection('products').findOne({ name });

    return findNameProd;
  } catch (_e) {
    throw new Error('validateName connection failed');
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
  validateNameMod,
};

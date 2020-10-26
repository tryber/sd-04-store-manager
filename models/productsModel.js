const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertProdMod = async (name, quantity) => {
  try {
    const db = await connection();
    const insertProd = await db.collection('products').insertOne({ name, quantity });
    const { insertedId: _id } = insertProd;
    const result = { _id, name, quantity };
    return result;
  } catch (_e) {
    throw new Error('insertProdMod connection failed');
  }
};

const validateNameMod = async (name) => {
  try {
    const db = await connection();
    const findNameProd = await db.collection('products').findOne({ name });

    return findNameProd;
  } catch (_e) {
    throw new Error('validateNameMod connection failed');
  }
};

const getAllProdMod = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();

  return products;
};

const getByIdProdMod = async (id) => {
  const x = ObjectId.isValid(id); // Variavel criada por causa do CC
  if (!x) return null;

  const db = await connection();
  const productId = await db.collection('products').findOne(ObjectId(id));
  return productId;
};

const updateByIdProdMod = async (id, name, quantity) => {
  const db = await connection();
  const updateProd = await db
    .collection('products')
    .findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
      { returnOriginal: false },
    );

  return updateProd.value;
};

const deleteProdMod = async (id) => {
  const pacienciaComCC = ObjectId.isValid(id);
  if (!pacienciaComCC) return null;

  const db = await connection();
  const deleteProd = await db.collection('products').deleteOne({ _id: ObjectId(id) });

  return deleteProd;
};

module.exports = {
  insertProdMod,
  getAllProdMod,
  validateNameMod,
  getByIdProdMod,
  updateByIdProdMod,
  deleteProdMod,
};

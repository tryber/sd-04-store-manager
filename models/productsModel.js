const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertProdMod = async (name, quantity) => {
  const db = await connection();
  const insertProd = await db.collection('products').insertOne({ name, quantity });
  const { insertedId: _id } = insertProd;
  const result = { _id, name, quantity };

  return result;
};

const validateNameMod = async (name) => {
  const db = await connection();
  const findNameProd = await db.collection('products').findOne({ name });

  return findNameProd;
};

const getAllProdMod = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();

  return products;
};

const getByIdProdMod = async (id) => {
  if (!ObjectId.isValid(id)) return null;

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
  if (!ObjectId.isValid(id)) return null;

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

const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  try {
    const db = await connection();
    const insertData = await db.collection('products').insertOne({ name, quantity });

    return insertData.ops[0];
    // ops => retorna o objeto criado com o Id
  } catch (err) {
    console.error('createProduct', err);
  }
};

const getProdByName = async (name) => {
  try {
    const db = await connection();
    const getProd = await db.collection('products').findOne({ name });
    return getProd;
  } catch (err) {
    console.error('getProdByName', err);
  }
};

const getProdById = async (id) => {
  try {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();
    const getProd = await db.collection('products').findOne(ObjectId(id));
    // console.log(getProd);
    return getProd;
  } catch (err) {
    console.error('getProdById', err);
  }
};

const getAllProducts = async () => {
  try {
    const db = await connection();
    const getArrayProducts = await db.collection('products').find().toArray();
    return getArrayProducts;
  } catch (err) {
    console.error('getAllProducts', err);
  }
};

module.exports = {
  createProduct,
  getProdByName,
  getProdById,
  getAllProducts,
};

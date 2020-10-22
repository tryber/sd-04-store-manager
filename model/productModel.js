const connection = require('./connection');
const { ObjectId } = require('mongodb');
// const { ObjectId } = require('mongodb');

const getAll = async () => {
  const db = await connection();
  return await db.collection('products').find().toArray();
};

const getByName = async (name) => {
  const db = await connection();
  return await db.collection('products').findOne({ name });
};

const getById = async (id) => {
  const db = await connection();
  if (ObjectId.isValid(id)) return null;
  return await db.collection('products').findOne(ObjectId(id));
};

const add = async (name, quantity) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  return newProduct.ops[0];
};

module.exports = {
  getAll,
  getByName,
  getById,
  add,
};

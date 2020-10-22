const connection = require('./connection');
const { ObjectId } = require('mongodb');
// const { ObjectId } = require('mongodb');

const getAll = async () => {
  const db = await connection();
  const stmt = await db.collection('products').find().toArray();
  return stmt;
};

const getByName = async (name) => {
  const db = await connection();
  const stmt = await db.collection('products').findOne({ name });
  return stmt;
};

const getById = async (id) => {
  const db = await connection();
  if (ObjectId.isValid(id)) return null;
  const stmt = await db.collection('products').findOne(ObjectId(id));
  return stmt;
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

const connection = require('./connection');
const { ObjectId } = require('mongodb');

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
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const stmt = await db.collection('products').findOne(ObjectId(id));
  return stmt;
};

const add = async (name, quantity) => {
  const db = await connection();
  const newProduct = await db.collection('products').insertOne({ name, quantity });
  return newProduct.ops[0];
};

const update = async (id, name, quantity) => {
  const db = await connection();
  const product = await db
    .collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return product;
};

const remove = async (id) => {
  const db = await connection();
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  getAll,
  getByName,
  getById,
  add,
  update,
  remove,
};

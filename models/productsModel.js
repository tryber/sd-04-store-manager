const { ObjectId } = require('mongodb');
const conn = require('../models/connection');

const create = async (name, quantity) => {
  const db = await conn();
  const result = await db.collection('products').insertOne({ name, quantity });

  return result.ops[0];
};

const read = async () => {
  const db = await conn();

  return db.collection('products').find().toArray();
};

const readById = async (id) => {
  const db = await conn();

  return db.collection('products').findOne(ObjectId(id));
};

const readByName = async (name) => {
  const db = await conn();

  return db.collection('products').findOne({ name });
};

const update = async (id, name, quantity) => {
  const db = await conn();

  await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return readById(id);
};

const del = async (id) => {
  const product = await readById(id);
  const db = await conn();

  await db.collection('products').deleteOne({ _id: ObjectId(id) });

  return product;
};

// (async () => console.log(await readById('5f974e60e1bdbb36b3baff28')))();

module.exports = {
  create,
  read,
  readById,
  readByName,
  update,
  del,
};

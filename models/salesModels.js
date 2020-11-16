const { ObjectId } = require('mongodb');
const conn = require('./connection');

const create = async (sales) => {
  const db = await conn();
  const result = await db.collection('sales').insertOne({ itensSold: sales });

  return result.ops[0];
};

const read = async () => {
  const db = await conn();

  return db.collection('sales').find().toArray();
};

const readById = async (id) => {
  const db = await conn();

  return db.collection('sales').findOne(ObjectId(id));
};

const update = async (id, itensSold) => {
  const db = await conn();

  await db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });

  return readById(id);
};

const del = async (id) => {
  const sale = await readById(id);
  const db = await conn();

  await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return sale;
};

// (async () => console.log(await create()))();

module.exports = {
  create,
  read,
  readById,
  update,
  del,
};

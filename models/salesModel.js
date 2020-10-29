const { ObjectId } = require('mongodb');
const conn = require('../models/connection');

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

// (async () => console.log(await create()))();

module.exports = {
  create,
  read,
  readById,
};

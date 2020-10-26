const conn = require('../models/connection');

const get = async (name) => {
  const db = await conn();
  return db.collection('products').findOne({ name });
};

const create = async (name, quantity) => {
  const db = await conn();
  const result = await db.collection('products').insertOne({ name, quantity });

  return result.ops[0];
};

// (async () => console.log(await get('ps555')))();

module.exports = {
  get,
  create,
};

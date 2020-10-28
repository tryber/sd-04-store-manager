// const { ObjectId } = require('mongodb');
const conn = require('../models/connection');

const create = async (sales) => {
  const db = await conn();
  const result = await db.collection('sales').insertOne({ itensSold: sales });

  return result.ops[0];
};

// (async () => console.log(await create()))();

module.exports = {
  create,
};

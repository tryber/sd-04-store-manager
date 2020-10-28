const { ObjectId } = require('mongodb');
const conn = require('../models/connection');

const create = async (sales) => {
  const db = await conn();
  const result = await db.collection('sales').insertOne({ itensSold: sales });

  return result.ops[0];
};

// (async () => console.log(await create(
//   [
//     {
//       "productId": "5f998efbb202707f1163fcc2",
//       "quantity": 1
//     },
//     {
//       "productId": "5f998f04b202707f1163fcc3",
//       "quantity": 1
//     }
//   ]  
// )))();

module.exports = {
  create,
};

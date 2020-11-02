// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const SALES = 'sales';

const adicionar = async (itensSold) => {
  const result = await connection().then((db) => db.collection(SALES).insertOne({ itensSold }));

  return result.ops[0];
};

module.exports = {
  adicionar,
};

// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSale = async (sales) => {
  const result = await connection().then((db) => db.collection('sales').insertOne(sales));
  return result.ops[0];
};

module.exports = {
  addSale,
};

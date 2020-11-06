// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSale = async (itensSold) => {
  const sales = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  const { insertedId: _id } = sales;

  const result = { _id, itensSold };
  return result;
};

module.exports = {
  addSale,
};

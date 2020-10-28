// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSale = async (itensSold) => {
  const data = connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  return data;
};

module.exports = { addSale };

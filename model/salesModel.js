// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSale = async (itensSold) => {
  const data = connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  return data;
};

const listSales = async () => {
  console.log('passou no listSales');
  const salesList = connection().then((db) => db.collection('sales').find({}).toArray());
  return salesList;
};

module.exports = { addSale, listSales };

const connection = require('./connection');
// const { ObjectID } = require('mongodb');

const getAllSales = async () => connection().then((db) => db.collection('sales').find().toArray());

const registerSale = async (data) => {
  const result = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: data }),
  );
  return result.ops[0];
};

module.exports = { getAllSales, registerSale };

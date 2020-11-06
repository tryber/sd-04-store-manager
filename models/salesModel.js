const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addSale = async (itensSold) => {
  const result = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  return result.ops[0];
};

const getAllSales = async () =>
  connection().then((db) => db.collection('sales').find().toArray());

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
};

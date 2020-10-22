const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getSales = async () => connection().then((db) => db.collection('sales').find().toArray());

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const sale = await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
  return sale;
};

const addSale = async (products) => {
  const result = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: products }),
  );

  return result.ops[0];
};

module.exports = {
  getSales,
  getSaleById,
  addSale,
};

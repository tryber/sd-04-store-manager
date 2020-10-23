const { ObjectID } = require('mongodb');
const connection = require('./connection');

const newSale = async (itensSold) => {
  const db = await connection();
  return db.collection('sales').insertOne({ itensSold });
};

const getAllSales = async () => {
  const db = await connection();
  return db.collection('sales').find({}).toArray();
};

const getSalesById = async (id) => {
  const db = await connection();
  return db.collection('sales').findOne(ObjectID(id));
};

const updateSales = async (id, itensSold) =>
  connection().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectID(id) }, { $set: { itensSold } }));

module.exports = {
  newSale,
  getAllSales,
  getSalesById,
  updateSales,
};

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

const deleteSales = async (id) => {
  const { value } = await connection()
    .then((db) => db.collection('sales').findOneAndDelete({ _id: ObjectID(id) }));
  return value;
};

module.exports = {
  newSale,
  getAllSales,
  getSalesById,
  updateSales,
  deleteSales,
};

const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const findAllSales = async () =>
  connection()
    .then((db) => db.collection('sales').find().toArray());

const addSale = async (products) => {
  const result = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: products }));
  return result.ops[0];
};

const updateSale = async (id, product) =>
  connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold: product } },
    ));

const deleteSale = async (id) =>
  connection()
    .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  findSaleById,
  findAllSales,
  addSale,
  updateSale,
  deleteSale,
};

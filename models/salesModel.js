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
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: products }))
    .then(({ insertedId }) => ({ _id: insertedId, itensSold }));
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

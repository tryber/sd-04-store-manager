const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllSales = async () => connection()
  .then((db) => db.collection('sales').find({}).toArray());

const postNewSale = async (itensSold) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold }))
  .then(({ insertedId }) => ({ _id: insertedId, itensSold }));

const getSaleById = async (id) => connection()
  .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));

const putSale = async (id, itensSold) => connection()
  .then((db) => db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }))
  .then(() => ({ _id: id, itensSold }));

const deleteSale = async (id) => connection()
  .then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAllSales,
  postNewSale,
  getSaleById,
  putSale,
  deleteSale,
};

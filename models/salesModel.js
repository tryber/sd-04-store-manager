const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findAll = async () => connection().then((db) => db.collection('sales').find().toArray());

const addSale = async (itensSold) =>
  connection().then((db) => db.collection('sales').insertOne({ itensSold }));

const updateSale = async (id, itensSold) =>
  (ObjectId.isValid(id)
    ? connection().then((db) =>
      db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }))
    : null);

const deleteSale = async (id) =>
  (ObjectId.isValid(id)
    ? connection().then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }))
    : null);

const findById = async (id) =>
  (ObjectId.isValid(id)
    ? connection().then((db) => db.collection('sales').findOne(ObjectId(id)))
    : null);

module.exports = {
  findAll,
  addSale,
  updateSale,
  deleteSale,
  findById,
};

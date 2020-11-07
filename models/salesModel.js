const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSales = async (collections, sales) => {
  const result = connection().then((db) => db.collection(collections).insertOne(sales));
  return (await result).ops[0];
};

const getAllSales = async (collections) =>
  connection().then((db) => db.collection(collections).find().toArray());

const findByIdSales = async (collection, id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection(collection).findOne(ObjectId(id)));
};

const update = async (collection, id, elements) => {
  connection().then((db) =>
    db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: { itensSold: [elements] } }),
  );
};
// Aprender sobre ObjectId

const deleteSale = async (collection, id) => {
  connection().then((db) => db.collection(collection).deleteOne({ _id: ObjectId(id) }));
};

module.exports = { addSales, getAllSales, findByIdSales, update, deleteSale };

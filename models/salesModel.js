const connection = require('./connection');
const { ObjectId, connect } = require('mongodb');

const getAll = async () => connection().then((db) => db.collection('products').find({}).toArray());

const findByName = async (collection, name) =>
  connection().then((db) => db.collection(collection).findOne({ name }));

const addSales = async (collections, sales) => {
  const result = connection().then((db) => db.collection(collections).insertOne(sales));
  return (await result).ops[0];
};

// Aprender sobre ObjectId
const findById = async (collection, id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection(collection).findOne(ObjectId(id)));
};

const update = async (collection, id, elements) => {
  connection().then((db) =>
    db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: elements }),
  );
};

const deleteProduct = async (collection, id) => {
  connection().then((db) => db.collection(collection).deleteOne({ _id: ObjectId(id) }));
};

module.exports = { findByName, addSales, findById, getAll, update, deleteProduct };

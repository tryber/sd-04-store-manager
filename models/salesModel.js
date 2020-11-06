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

// Aprender sobre ObjectId

module.exports = { addSales, getAllSales, findByIdSales };

const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection().then((db) => db.collection('products').find({}).toArray());
};

const findByName = async (collection, name) =>
  connection().then((db) => db.collection(collection).findOne({ name }));

const addProduct = async (name, quantity) =>
  connection().then((db) => db.collection('products').insertOne({ name, quantity }));

//Aprender sobre ObjectId
const findById = async (collection, id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection(collection).findOne(ObjectId(id)));
};

module.exports = { findByName, addProduct, findById, getAll };

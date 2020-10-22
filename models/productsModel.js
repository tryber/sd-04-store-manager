const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getAll = async () =>
  connection().then((db) => db.collection('products').find({}).toArray());

const getProductById = async (id) =>
  connection().then((db) => db.collection('products').findOne(ObjectID(id)));

const newProduct = async (name, quantity) => {
  const db = await connection();
  return db.collection('products').insertOne({ name, quantity });
};

const getProductByName = async (searchName) =>
  connection().then((db) => db.collection('products').findOne({ name: searchName }));

module.exports = {
  getAll,
  newProduct,
  getProductByName,
  getProductById,
};

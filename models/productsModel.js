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

const updateProduct = async (id, name, quantity) => {
  const db = await connection();
  return db.collection('products').updateOne({ _id: ObjectID(id) }, { $set: { name, quantity } });
}

module.exports = {
  getAll,
  newProduct,
  getProductByName,
  getProductById,
  updateProduct,
};

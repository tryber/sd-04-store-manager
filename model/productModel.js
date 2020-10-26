const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findByName = async (name) =>
  connection().then((db) => db.collection('products').findOne({ name }));

const add = async (name, quantity) =>
  connection().then((db) => db.collection('products').insertOne({ name, quantity }));

const listProducts = async () => {
  const data = await connection().then((db) => db.collection('products').find().toArray());
  return data;
};

const findProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const returnedProduct = await connection().then((db) =>
    db.collection('products').findOne(ObjectId(id)),
  );
  return returnedProduct;
};

const updateProduct = async (id, name, quantity) => {
  console.log(id, name, quantity);
  await connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
};

module.exports = { findByName, add, listProducts, findProductById, updateProduct };

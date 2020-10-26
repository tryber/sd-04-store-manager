const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findByName = async (name) =>
  connection().then((db) => db.collection('products').findOne({ name }));

const add = async (name, quantity) =>
  connection().then((db) => db.collection('products').insertOne({ name, quantity }));

const listProducts = async () => {
  console.log('listproducts');
  const data = await connection().then((db) => db.collection('products').find().toArray());
  console.log(data);
  return data;
};

const findProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const returnedProduct = await connection().then((db) =>
    db.collection('products').findOne(ObjectId(id)),
  );
  console.log(returnedProduct);
  return returnedProduct;
};

module.exports = { findByName, add, listProducts, findProductById };

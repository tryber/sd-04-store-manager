require('dotenv').config();
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getProducts = async () =>
  connection().then((db) => db.collection('products').find().toArray());

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const product = await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
  return product;
};

const addProduct = async (name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );

  return result.ops[0];
};

module.exports = { getProducts, getProductById, addProduct };

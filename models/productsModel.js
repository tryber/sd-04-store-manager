/* eslint-disable function-paren-newline */
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addProduct = async (name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );
  return result;
};

const updateProduct = async (id, name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
  return result;
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection().then((db) =>
    db.collection('products').deleteOne({ _id: ObjectId(id) }),
  );
  return result;
};

const findByName = async (name) => {
  const result = await connection().then((db) => db.collection('products').findOne({ name }));
  return result;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection().then((db) =>
    db.collection('products').findOne({ _id: ObjectId(id) }),
  );
  return result;
};

const findAll = async () => {
  const allProducts = await connection().then((db) => db.collection('products').find().toArray());
  return allProducts;
};

module.exports = { addProduct, findByName, findAll, findById, updateProduct, deleteProduct };

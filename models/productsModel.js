/* eslint-disable function-paren-newline */
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addProduct = async (name, quantity) =>
  connection().then((db) => db.collection('products').insertOne({ name, quantity }));

const updateProduct = async (id, name, quantity) =>
  connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );

const deleteProduct = async (id) =>
  (ObjectId.isValid(id)
    ? connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }))
    : null);

const findByName = async (name) =>
  connection().then((db) => db.collection('products').findOne({ name }));

const findById = async (id) =>
  (ObjectId.isValid(id)
    ? connection().then((db) => db.collection('products').findOne({ _id: ObjectId(id) }))
    : null);

const findAll = async () => connection().then((db) => db.collection('products').find().toArray());

module.exports = { addProduct, findByName, findAll, findById, updateProduct, deleteProduct };

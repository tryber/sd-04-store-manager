const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async (collection) =>
  connection().then((db) => db.collection(collection).find().toArray());

const newProduct = async (name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
  return result.ops[0];
};

const findById = async (id, collection) =>
  connection().then((db) => db.collection(collection).findOne(ObjectId(id)));

const updateProduct = async (id, name, quantity) =>
  connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

const deleteProduct = async (id) =>
  connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

module.exports = { getAll, newProduct, findById, updateProduct, deleteProduct };

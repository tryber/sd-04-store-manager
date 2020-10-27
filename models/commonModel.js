const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async (collection) =>
  connection().then((db) => db.collection(collection).find().toArray());

const add = async (itensSold, collection) => {
  let value = { itensSold: [itensSold] };
  if (collection === 'products') value = { name: itensSold.name, quantity: itensSold.quantity };
  const result = await connection().then((db) =>
    db.collection(collection).insertOne(value));
  return result.ops[0];
};

const findById = async (id, collection) =>
  connection().then((db) => db.collection(collection).findOne(ObjectId(id)));

const update = async (id, data, collection) => {
  let value = { itensSold: data };
  if (collection === 'products') value = { name: data.name, quantity: data.quantity };
  connection().then((db) =>
    db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: value }));
};

const exclude = async (id) =>
  connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

module.exports = { getAll, add, findById, update, exclude };

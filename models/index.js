const { ObjectId } = require('mongodb');
const connection = require('./connection');
const products = require('./productsModel');
const sales = require('./salesModel');

const addNew = (collection, info) => connection()
  .then((db) => db.collection(collection).insertOne(info))
  .then(((result) => result.ops[0]));

const getAll = (collection) => connection()
  .then((db) => db.collection(collection).find().toArray());

const getById = (collection, id) => {
  if (!ObjectId.isValid(id)) return Promise.reject(new Error('Wrong id format'));
  return connection().then((db) => db.collection(collection).findOne(ObjectId(id)));
};

const update = (collection, id, info) => {
  if (!ObjectId.isValid(id)) return Promise.reject(new Error('Wrong id format'));
  return connection()
    .then((db) => db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: info }));
};

module.exports = { connection, products, sales, addNew, getAll, getById, update };

const connection = require('./connection');
const products = require('./productsModel');
const sales = require('./salesModel');

const addNew = (collection, info) => connection()
  .then((db) => db.collection(collection).insertOne(info))
  .then(((result) => result.ops[0]));

const getAll = (collection) => connection()
  .then((db) => db.collection(collection).find().toArray());

module.exports = { connection, products, sales, addNew, getAll };

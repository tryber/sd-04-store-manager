require('dotenv').config();
const connection = require('./connection');

const getProducts = async () =>
  connection().then((db) => db.collection('products').find().toArray());

module.exports = { getProducts };

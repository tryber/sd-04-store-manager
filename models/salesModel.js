// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSale = async (itensSold) =>
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold }))
    .then((result) => result.ops[0]);

module.exports = { addSale };

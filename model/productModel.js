const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLETION = 'products';

const add = async (name, quantity) => {
  const result = await connection().then((db) => db.collection(COLLETION).insertOne({ name, quantity}));

  return result.ops[0];
}

const getByName = async (name) => {
  const product =  await connection().then((db) => db.collection(COLLETION).findOne({"name": `${name}`}, {"name": 1}));

  return product;
}

module.exports = {
  getByName,
  add,
}
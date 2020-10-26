// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('sales').find().toArray());

const add = async (name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('sales').insertOne({ name, quantity }));
  const sale = Object.fromEntries(
    Object.entries(result.ops[0]).sort(),
  );
  return sale;
};

module.exports = {
  getAll,
  add,
};

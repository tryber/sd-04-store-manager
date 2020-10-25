const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = async (...itensSold) => {
  const result = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  return result.ops[0];
};

const getAll = async () => connection().then((db) => db.collection('sales').find().toArray());

const findById = async (id) =>
  connection().then((db) => db.collection('sales').findOne(ObjectId(id)));

module.exports = {
  add,
  getAll,
  findById,
};

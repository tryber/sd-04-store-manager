const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = async (itensSold) => {
  const result = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  return result.ops[0];
};

const getAll = async () => {
  const result = await connection().then((db) => db.collection('sales').find().toArray());
  return result;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
  return result;
};

module.exports = {
  add,
  getAll,
  findById,
};

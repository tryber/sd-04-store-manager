const { ObjectId } = require('mongodb');
const connection = require('./connection');

const SALES = 'sales';

const adicionar = async (itensSold) => {
  const result = await connection().then((db) => db.collection(SALES).insertOne({ itensSold }));

  return result.ops[0];
};

const getById = async (id) => {
  console.log("model==>>",id)
  if (!ObjectId.isValid(id)) throw new Error();
  return connection().then((db) => db.collection(SALES).findOne(ObjectId(id)));
};

const getAll = async () => connection().then((db) => db.collection(SALES).find().toArray());

module.exports = {
  getAll,
  getById,
  adicionar,
};

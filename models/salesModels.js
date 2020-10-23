const connection = require('./connection');
const { ObjectId } = require('mongodb');

const cadastro = async (data) => {
  const db = await connection();
  const venda = await db.collection('sales').insertOne(data);

  return venda.ops[0];
};

const findAll = async () =>
  connection().then((db) => db.collection('sales').find().toArray());

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

module.exports = {
  cadastro,
  findAll,
  findById,
};

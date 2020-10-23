const connection = require('./connection');
const { ObjectId } = require('mongodb');

const cadastro = async (data) => {
  const db = await connection();
  const produto = await db.collection('products').insertOne(data);

  return produto.ops[0];
};

const findByName = async (name) =>
  connection().then((db) => db.collection('products').findOne({ name }));

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const findAll = async () =>
  connection().then((db) => db.collection('products').find().toArray());

module.exports = {
  cadastro,
  findByName,
  findAll,
  findById,
};

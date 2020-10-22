const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () =>
  connection().then((db) => db.collection('products').find({}).toArray());

const getById = async (id) => {
  if (ObjectId.isValid(id)) return null;
  await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const getByName = async (name) => {
  await connection().then((db) => db.collection('products').findOne({ name }));
};

const add = async (name, quantity) => {
  const result = await connection().then((db) => db.collection('products').insertOne({ name, quantity }));
  // o ops retorna todos os objetos que foram inseridos na operação acima.
  // Como só tem 1, pegaremos o de indice 0.
  // so funciona com insertOne. Nao funciona para UpdateOne.
  return result.ops[0];
};

// removeById: deleteOne(_id: ObjectId));

module.exports = {
  getAll,
  getById,
  getByName,
  add,
};

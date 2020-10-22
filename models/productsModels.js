const connection = require('./connection');
const { ObjectId } = require('mongodb');
const rescue = require('express-rescue');


const cadastro = async (data) => {
  const db = await connection();
  const produto = await db.collection('products').insertOne(data);
  return produto.insertedId;
};

const findByName = async (name) => {
  connection().then((db) => db.collection('products').findOne({ name: name }));
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection().then((db) => db.collection('products').findOne(ObjectId(id)))
};

const findAll = async () => {
  await connection().then((db) => db.collection('products').find().toArray())
};

module.exports = {
  cadastro,
  findByName,
  findAll,
  findById,
};

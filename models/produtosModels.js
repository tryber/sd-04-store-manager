const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addProduto = async (name, quantity) => {
  const produto = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
  return produto.ops[0];
};

const podutoPorNome = async (nome) =>
  connection().then((db) => db.collection('products').find({ name: nome }).toArray());

const listaProdutos = async () =>
  connection().then((db) => db.collection('products').find({}).toArray());

const produtoPorId = async (id) =>
  connection().then((db) => db.collection('products').findOne(ObjectId(id)));

const atualizarProduto = async (id, name, quantity) => {
  await connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const deletaProduto = async (id) =>
  connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  addProduto,
  podutoPorNome,
  listaProdutos,
  produtoPorId,
  atualizarProduto,
  deletaProduto,
};

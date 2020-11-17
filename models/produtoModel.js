const { ObjectId } = require('mongodb');
const connect = require('./connection');

// Mostrar Produtos
const findAllProdutos = async () =>
  connect().then((db) => db.collection('products').find({}).toArray());

// Cria Produto
const criarProduto = async (name, quantity) => {
  const result = await connect().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
  return result.ops[0];
};

// Procura produto por nome
const findProdutoByName = async (name) =>
  connect().then((db) => db.collection('products').find({ name }).toArray());

// Procura produto por Id
const findProdutoById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connect().then((db) => db.collection('actors').findOne(ObjectId(id)));
};

// Atualiza Produto
const upProduto = async (id, name, quantity) => {
  await connect().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
};

// Deleta Produto
const deleteProduto = async (id) => {
  await connect().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  findAllProdutos,
  criarProduto,
  findProdutoByName,
  findProdutoById,
  upProduto,
  deleteProduto,
};

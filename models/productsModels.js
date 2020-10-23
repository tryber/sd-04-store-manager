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

const atualizacao = async (id, name, quantity) => {
  const product = await findById(id);

  if (!product) return null;

  await connection().then((db) => db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  const newProduct = await findById(id);
  return newProduct;
}

module.exports = {
  cadastro,
  findByName,
  findAll,
  findById,
  atualizacao,
};

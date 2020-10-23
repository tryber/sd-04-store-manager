const connection = require('./connection');
const { ObjectId } = require('mongodb');

const listProducts = async () => {
  const data = await connection().then((db) => db.collection('products').find().toArray());
  return data;
};

const cadastraProduto = async (name, quantity) => {
  const data = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );

  return data.ops[0];
};

const findByName = async (obj) => {
  const data = await connection()
    .then((db) => db.collection('products').find(obj).toArray())
    .then((e) => e.map(({ name }) => ({ name })));

  console.log(data);
  return data[0];
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const data = await connection().then((db) => db.collection('products').findOne(ObjectId(id)));

  return data;
};

module.exports = {
  cadastraProduto,
  findByName,
  listProducts,
  findById,
};

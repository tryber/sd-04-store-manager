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

const updateProduct = async (id, name, quantity) => {
  const myQuery = { _id: ObjectId(id) };
  const newValues = { $set: { name, quantity } };

  await connection().then((db) => db.collection('products').updateOne(myQuery, newValues));
};

const removeProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  await connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  cadastraProduto,
  findByName,
  listProducts,
  findById,
  updateProduct,
  removeProduct,
};

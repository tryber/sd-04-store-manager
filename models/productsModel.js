const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findByName = async (name) =>
  connection()
    .then((db) => db.collection('products').findOne({ name }));

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
};

const addProduct = async (name, quantity) => {
  const result = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return result.ops[0];
};

const findAll = async () =>
  connection()
    .then((db) => db.collection('products').find().toArray());

const updateProduct = async (id, name, quantity) => {
  await connection().then((db) => db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
  ));
};

const deleteProduct = async (id) =>
  connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  findByName,
  findById,
  addProduct,
  findAll,
  updateProduct,
  deleteProduct,
};

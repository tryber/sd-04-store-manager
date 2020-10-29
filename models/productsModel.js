const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () =>
  connection().then((db) => db.collection('products').find().toArray());

const getByName = async (name) =>
  connection().then((db) => db.collection('products').findOne({ name }));

const addProduct = async (name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );
  return result.ops[0];
};

const updateProduct = async (id, name, quantity) => {
  await connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
};

module.exports = {
  getAll,
  getByName,
  addProduct,
  updateProduct,
};

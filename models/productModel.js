const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('products').find().toArray());
const getByName = async (name) => connection().then((db) => db.collection('products').findOne({ name }));
const getById = async (id) => connection().then((db) => db.collection('products').findOne(ObjectId(id)));

const add = async (name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
  const product = Object.fromEntries(
    Object.entries(result.ops[0]).sort(),
  );
  return product;
};

const update = async (id, name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  if (result.result.ok !== 1) {
    return 'Could not update';
  }
  const product = {
    _id: ObjectId(id),
    name,
    quantity,
  };
  return product;
};

module.exports = {
  add,
  getAll,
  getById,
  getByName,
  update,
};

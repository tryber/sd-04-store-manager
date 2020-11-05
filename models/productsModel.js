// const { Db, ObjectId } = require('mongodb');
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addProduct = async (name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );
  return result.ops[0];
};

const findByName = async (name) => {
  const result = await connection().then((db) => db.collection('products').findOne({ name }));
  return result;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
  return result;
};

const findAll = async () => {
  const result = await connection().then((db) => db.collection('products').find().toArray());
  return result;
};

module.exports = {
  addProduct,
  findByName,
  findById,
  findAll,
};

const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = async (name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );
  return result.ops[0];
};

const findByName = async (name) => {
  const result = await connection().then((db) => db.collection('products').findOne({ name }));
  return result;
};

const getAll = async () => {
  const result = await connection().then((db) => db.collection('products').find().toArray());
  return result;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
  return result;
};

const update = async (id, name, quantity) => {
  await connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
};

const remove = async (id) => {
  await connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  add,
  findByName,
  getAll,
  findById,
  update,
  remove,
};

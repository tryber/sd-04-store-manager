const { ObjectId } = require('mongodb');
const connection = require('./connector');

const findById = async (collection, id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection(collection).findOne(ObjectId(id));
  return result;
};

const findAll = async (collection) => {
  const db = await connection();
  const results = await db.collection(collection).find({}).toArray();
  return results;
};

const findByName = async (collection, name) => {
  const db = await connection();
  const result = await db.collection(collection).findOne({ name });
  return result;
};

const createOne = async (collection, name, quantity) => {
  const db = await connection();
  const result = await db.collection(collection).insertOne({ name, quantity });
  return result.ops[0];
};

const update = async (collection, id, name, quantity) => {
  const db = await connection();
  await db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
};

const remove = async (collection, id) => {
  const db = await connection();
  await db.collection(collection).deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  findAll,
  findByName,
  createOne,
  findById,
  update,
  remove,
};

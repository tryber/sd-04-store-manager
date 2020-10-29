const { ObjectId } = require('mongodb');
const connection = require('./connection');

const collection = 'products';

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  try {
    const db = await connection();
    const result = await db.collection(collection).findOne(ObjectId(id));
    return result;
  } catch (e) {
    console.log(e);
  }
};

const findAll = async () => {
  try {
    const db = await connection();
    const results = await db.collection(collection).find({}).toArray();
    return results;
  } catch (e) {
    console.log(e);
  }
};

const findByName = async (name) => {
  try {
    const db = await connection();
    const result = await db.collection(collection).findOne({ name });
    return result;
  } catch (e) {
    console.log(e);
  }
};

const createOne = async (name, quantity) => {
  try {
    const db = await connection();
    const result = await db.collection(collection).insertOne({ name, quantity });
    return result.ops[0];
  } catch (e) {
    console.log(e);
  }
};

const update = async (id, name, quantity) => {
  try {
    const db = await connection();
    await db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  } catch (e) {
    console.log(e);
  }
};

module.exports = { findAll, findById, update, findByName, createOne };

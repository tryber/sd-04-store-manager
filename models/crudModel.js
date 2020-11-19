const connection = require('./connector');

const findByName = async (collection, name) => {
  const db = await connection();
  const results = await db.collection(collection).findOne({ name });
  return results;
};

const findAll = async (collection) => {
  const db = await connection();
  const results = await db.collection(collection).find({}).toArray();
  return results;
};

const createOne = async (collection, query) => {
  const db = await connection();
  const result = await db.collection(collection).insertOne(query);
  return result.ops[0];
};

module.exports = {
  findByName,
  findAll,
  createOne,
};

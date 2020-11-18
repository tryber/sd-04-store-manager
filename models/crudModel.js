const connection = require('./connector');

const findByName = async (collection, name) => {
  const db = await connection();
  const result = await db.collection(collection).findOne({ name });
  return result;
};

const createOne = async (collection, name, quantity) => {
  const db = await connection();
  const result = await db.connection(collection).insertOne({ name, quantity });
  return result.ops[0];
};

module.exports = {
  findByName,
  createOne,
};

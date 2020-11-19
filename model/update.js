const { ObjectId } = require('mongodb');
const connection = require('./connection');

const update = async (collection, id, query) => {
  const db = await connection();
  await db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: query });
};

module.exports = update;

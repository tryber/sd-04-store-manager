const { ObjectId } = require('mongodb');
const connection = require('./connection');

const remove = async (collection, id) => {
  const db = await connection();
  await db.collection(collection).deleteOne({ _id: ObjectId(id) });
};

module.exports = remove;

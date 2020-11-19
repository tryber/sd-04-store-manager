const { ObjectId } = require('mongodb');
const connection = require('./connection');

const remove = async (collection, id) => {
  const db = await connection();
  console.log('REMOVE', id);
  await db.collection(collection).deleteOne({ _id: ObjectId(id) });
};

module.exports = remove;

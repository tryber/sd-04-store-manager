const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getById = async (id, collection) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection(collection).findOne(ObjectId(id)));
};

const deleteProduct = async (id, collection) => {
  await connection().then((db) => db.collection(collection).deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getById,
  deleteProduct,
};

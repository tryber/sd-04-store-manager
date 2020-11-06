const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addNew = (collection, info) => connection()
  .then((db) => db.collection(collection).insertOne(info))
  .then(((result) => result.ops[0]));

const getAll = (collection) => connection()
  .then((db) => db.collection(collection).find().toArray());

const getById = (collection, id) => {
  if (!ObjectId.isValid(id)) return Promise.reject(new Error('Wrong id format'));
  return connection().then((db) => db.collection(collection).findOne(ObjectId(id)));
};

const update = (collection, id, info) => {
  if (!ObjectId.isValid(id)) return Promise.reject(new Error('Wrong id format'));
  return connection()
    .then((db) => db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: info }));
};

const remove = async (collection, id, message = 'Wrong id format') => {
  if (!ObjectId.isValid(id)) return Promise.reject(new Error(message));
  const product = await getById(collection, id);
  const { deletedCount } = await connection()
    .then((db) => db.collection(collection).deleteOne({ _id: ObjectId(id) }));

  return deletedCount ? product : Promise.reject(new Error(message));
};

module.exports = { connection, addNew, getAll, getById, update, remove };

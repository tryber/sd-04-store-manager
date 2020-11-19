const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findById = async (collection, id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection(collection).findOne(ObjectId(id));
  return result;
};

const findByName = async (collection, name) => {
  const db = await connection();
  const result = await db.collection(collection).findOne({ name });
  return result;
};

const getAll = async (collection) => {
  const db = await connection();
  const results = await db.collection(collection).find({}).toArray();
  return results;
};

const findBy = async (by, query = '', collection) => {
  switch (by) {
    case 'id':
      return findById(collection, query);
    case 'name':
      return findByName(collection, query);
    case 'all':
      return getAll(collection);
    default:
      return null;
  }
};

module.exports = findBy;

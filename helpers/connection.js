const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('artists').find({}).toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) => db.collection('artists').findOne(ObjectId(id)));
};

const add = async (data) => {
  const artist = await connection().then((db) => db.collection('artists').insertOne(data));
  return artist.insertedId;
};

module.exports = { getAll, getById, add };

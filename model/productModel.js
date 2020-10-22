const { ObjectId } = require('mongodb');
const connection = require('./connection');

const COLLETION = 'products';

const getAll = async () => connection().then((db) => db.collection(COLLETION).find().toArray());

const add = async (name, quantity) => {
  const result = await connection().then((db) =>
    db.collection(COLLETION).insertOne({ name, quantity }),
  );

  return result.ops[0];
};

const getByName = async (name) =>
  connection().then((db) => db.collection(COLLETION).findOne({ name: `${name}` }, { name: 1 }));

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection(COLLETION).findOne(ObjectId(id)));
};

module.exports = {  
  getAll,
  getById,
  getByName,
  add,
};

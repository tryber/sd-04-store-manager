const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async (collection) =>
  connection().then((db) => db.collection(collection).find().toArray());

const findById = async (collection, id) =>
  connection().then((db) => db.collection(collection).findOne(ObjectId(id)));

const add = async (collection, ...itensSold) => {
  let data = { itensSold };
  if (collection === 'products') data = { name: itensSold[0].name, quantity: itensSold[0].quantity };
  const result = await connection().then((db) => db.collection(collection).insertOne(data));
  return result.ops[0];
};

const update = async (collection, id, ...itensSold) => {
  let data = { itensSold };
  if (collection === 'products') data = { name: itensSold[0].name, quantity: itensSold[0].quantity };
  connection().then((db) =>
    db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }));
};

module.exports = {
  getAll,
  findById,
  add,
  update,
};

const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllSales = async () => {
  const db = await connection();
  return db.collection('sales').find().toArray();
};

const getById = async (id) => {
  const db = await connection();
  return db.collection('sales').findOne(ObjectId(id));
};

const add = async (itensSold) => {
  const result = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold }));
  const sales = Object.fromEntries(
    Object.entries(result.ops[0]).sort(),
  );
  return sales;
};

const update = async (id, itensSold) => {
  const result = await connection().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }));
  if (result.result.ok !== 1) {
    return 'Could not update';
  }
  const sale = {
    _id: ObjectId(id),
    itensSold,
  };
  return sale;
};

const del = async (id) => {
  const result = await connection().then((db) =>
    db.collection('sales').deleteOne({ _id: ObjectId(id) }));
  return result.result;
};

module.exports = {
  add,
  getAllSales,
  getById,
  update,
  del,
};

const connection = require('./connection');
const { ObjectId } = require('mongodb');

const add = async (sale) => {
  const db = await connection();
  const newSale = await db.collection('sales').insertOne({ itensSold: sale});
  return newSale.ops[0];
};

const getAll = async () => {
  const db = await connection();
  const stmt = await db.collection('sales').find().toArray();
  return stmt;
};

const getByName = async (name) => {
  const db = await connection();
  const stmt = await db.collection('sales').findOne({ name });
  return stmt;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const stmt = await db.collection('sales').findOne(ObjectId(id));
  return stmt;
};

const update = async (id, sale) => {
  const db = await connection();
  const stmt = await db
    .collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } });
  return stmt;
};

const remove = async (id) => {
  const db = await connection();
  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  getAll,
  getByName,
  getById,
  add,
  update,
  remove,
};
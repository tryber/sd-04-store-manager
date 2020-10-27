const connection = require('./connection');
const { ObjectId } = require('mongodb');

const add = async (sale) => {
  const db = await connection();
  const newSale = await db.collection('sales').insertOne({ itensSold: sale });
  return newSale.ops[0];
};

const getAll = async () => connection().collection('sales').find().toArray();

const getByName = async (name) => connection().collection('sales').findOne({ name });

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const sale = await connection().collection('sales').findOne(ObjectId(id));
  return sale;
};

const update = async (id, sale) => {
  const db = await connection();
  const stmt = await db
    .collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } });
  return stmt;
};

const remove = async (id) =>
  connection()
    .collection('sales')
    .deleteOne({ _id: ObjectId(id) });

module.exports = {
  getAll,
  getByName,
  getById,
  add,
  update,
  remove,
};

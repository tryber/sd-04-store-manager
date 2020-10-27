const connection = require('./connection');
const { ObjectId } = require('mongodb');

const add = async (sale) => {
  const db = await connection();
  const newSale = await db.collection('sales').insertOne({ itensSold: sale });
  return newSale.ops[0];
};

const getAll = async () => await connection().collection('sales').find().toArray();

const getByName = async (name) => await connection().collection('sales').findOne({ name });

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return await connection().collection('sales').findOne(ObjectId(id));
};

const update = async (id, sale) => {
  const db = await connection();
  const stmt = await db
    .collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } });
  return stmt;
};

const remove = async (id) =>
  await connection()
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

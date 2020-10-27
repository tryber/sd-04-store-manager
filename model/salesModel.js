const connection = require('./connection');
const { ObjectId } = require('mongodb');

const collection = 'sales';

const add = async (sale) => {
  const db = await connection();
  const newSale = await db.collection(collection).insertOne({ itensSold: sale });
  return newSale.ops[0];
};

const getAll = async () => {
  const db = await connection();
  try {
    const stmt = await db.collection(collection).find().toArray();
    return stmt;
  } catch (err) {
    return process.exit(1);
  }
};

const getByName = async (name) => {
  const db = await connection();
  try {
    const stmt = await db.collection(collection).findOne({ name });
    return stmt;
  } catch (err) {
    return process.exit(1);
  }
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const stmt = await db.collection(collection).findOne(ObjectId(id));
  return stmt;
};

const update = async (id, sale) => {
  const db = await connection();
  
  const stmt = await db
    .collection(collection)
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } });
  return stmt;
};

const remove = async (id) => {
  const db = await connection();
  await db.collection(collection).deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  getAll,
  getByName,
  getById,
  add,
  update,
  remove,
};

const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllSales = async () => {
  const db = await connection();
  const list = await db.collection('sales').find().toArray();
  return list;
};

const findById = async (id) => {
  const db = await connection();
  if (!ObjectId.isValid(id)) return null;
  const item = await db.collection('sales').findOne(ObjectId(id));
  return item;
};

const findByName = async (name) => {
  const db = await connection();
  const item = await db.collection('sales').findOne({ name });
  return item;
};

const registerSale = async (sale) => {
  const db = await connection();
  const newSale = await db.collection('sales').insertOne({ itensSold: sale });
  return newSale.ops[0];
};

const updateSale = async (id, sale) => {
  const db = await connection();
  const product = await db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } });
  return product;
};

const deleteSale = async (id) => {
  const db = await connection();
  const product = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return product;
};

module.exports = {
  getAllSales,
  findById,
  findByName,
  registerSale,
  updateSale,
  deleteSale,
};

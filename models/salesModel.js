const connection = require('./connection');
const { ObjectId } = require('mongodb');

const add = async (itensSold) => {
  try {
    const db = await connection();
    const addSales = await db.collection('sales').insertOne({ itensSold });
    return addSales.ops[0];
  } catch (err) {
    return null;
  }
};

const getById = async (id) => {
  try {
    const db = await connection();
    const sale = await db.collection('sales').findOne({ _id: ObjectId(id) });
    return sale;
  } catch (err) {
    return null;
  }
};

const update = async (id, itensSold) => {
  try {
    const db = await connection();
    await db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
    const sale = await getById(id);
    return sale;
  } catch (err) {
    return null;
  }
};

module.exports = {
  add,
  getById,
  update,
};

const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerSales = async (itensSold) => {
  const db = await connection();
  const sales = await db.collection('sales').insertOne({ itensSold });

  return sales.ops[0];
};

const getAllSales = async () => {
  try {
    const db = await connection();
    const getSales = await db.collection('sales').find().toArray();
    return getSales;
  } catch (err) {
    console.error(err);
  }
};

const getSaleById = async (id) => {
  try {
    if (!ObjectId.isValid(id)) return null;

    const db = await connection();
    const getSale = await db.collection('sales').findOne(ObjectId(id));

    return getSale;
  } catch (err) {
    console.error(err);
  }
};

module.exports = { registerSales, getAllSales };

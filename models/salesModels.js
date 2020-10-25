// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const dbCollection = 'sales';

const registerSales = async (itensSold) => {
  try {
    const db = await connection();
    const sales = await db.collection(dbCollection).insertOne({ itensSold });

    return sales.ops[0];
  } catch (err) {
    console.error('registerSales', err);
  }
};

const getAllSales = async () => {
  try {
    const db = await connection();
    const getSales = await db.collection(dbCollection).find({}).toArray();
    return getSales;
  } catch (err) {
    console.error('getAllSales', err);
  }
};

module.exports = {
  registerSales,
  getAllSales,
};

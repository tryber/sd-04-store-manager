const { ObjectId } = require('mongodb');
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

const getSaleById = async (id) => {
  try {
    if (!ObjectId.isValid(id)) return null;

    const db = await connection();
    const getSale = await db.collection(dbCollection).findOne(ObjectId(id));

    return getSale;
  } catch (err) {
    console.error('getSaleById', err);
  }
};

const deleteSales = async (id) => {
  try {
    const db = await connection();
    await db.collection(dbCollection).deleteOne({ _id: ObjectId(id) });
  } catch (err) {
    console.error('deleteSale', err);
  }
};

module.exports = {
  registerSales,
  getAllSales,
  getSaleById,
  deleteSales,
};

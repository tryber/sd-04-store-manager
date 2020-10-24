const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertSalesMod = async (itensSold) => {
  try {
    const db = await connection();
    const insertSales = await db.collection('sales').insertOne({ itensSold });
    const { insertedId: _id } = insertSales;
    const result = { _id, itensSold };
    return result;
  } catch (_e) {
    throw new Error('insertSalesMod connection failed');
  }
};

const getAllSalesMod = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find({}).toArray();

  return sales;
};

const getByIdSalesMod = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const productId = await db.collection('sales').findOne(ObjectId(id));
  return productId;
};

module.exports = {
  insertSalesMod,
  getAllSalesMod,
  getByIdSalesMod,
};

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
  try {
    const db = await connection();
    const sales = await db.collection('sales').find({}).toArray();

    return sales;
  } catch (_e) {
    throw new Error('getAllSalesMod connection failed');
  }
};

const getByIdSalesMod = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  try {
    const db = await connection();
    const salesId = await db.collection('sales').findOne(ObjectId(id));
    return salesId;
  } catch (_e) {
    throw new Error('getByIdSalesMod connection failed');
  }
};

const updateByIdSalesMod = async (id, itensSold) => {
  try {
    const db = await connection();
    const updateSales = await db.collection('sales').findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { itensSold } },
      { returnOriginal: false },
      // { returnNewDocument: true },
    );

    return updateSales.value;
  } catch (_e) {
    throw new Error('updateByIdSalesMod connection failed');
  }
};

const deleteSalesMod = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  try {
    const db = await connection();
    const deleteSales = await db.collection('sales').deleteOne({ _id: ObjectId(id) });

    return deleteSales;
  } catch (_e) {
    throw new Error('deleteSalesMod connection failed');
  }
};

module.exports = {
  insertSalesMod,
  getAllSalesMod,
  getByIdSalesMod,
  updateByIdSalesMod,
  deleteSalesMod,
};

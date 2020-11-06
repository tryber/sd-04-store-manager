const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertSalesMod = async (itensSold) => {
  const db = await connection();
  const insertSales = await db.collection('sales').insertOne({ itensSold });
  const { insertedId: _id } = insertSales;
  const result = { _id, itensSold };

  return result;
};

const getAllSalesMod = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find({}).toArray();

  return sales;
};

const getByIdSalesMod = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const salesId = await db.collection('sales').findOne(ObjectId(id));

  return salesId;
};

const updateByIdSalesMod = async (id, itensSold) => {
  const db = await connection();
  const updateSales = await db
    .collection('sales')
    .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { itensSold } }, { returnOriginal: false });

  return updateSales.value;
};

const deleteSalesMod = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const deleteSales = await db.collection('sales').deleteOne({ _id: ObjectId(id) });

  return deleteSales;
};

module.exports = {
  insertSalesMod,
  getAllSalesMod,
  getByIdSalesMod,
  updateByIdSalesMod,
  deleteSalesMod,
};

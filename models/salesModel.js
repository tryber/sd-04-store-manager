const connection = require('./connections');
const { ObjectId } = require('mongodb');

const addSale = async (itensSold) => {
  try {
    const result = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));
    return result.ops[0];
  } catch (_e) {
    console.log('Model stop', _e);
  }
};

const getAllSales = async () => {
  try {
    const sales = await connection().then((db) => db.collection('sales').find().toArray());
    return sales;
  } catch (_e) {
    console.log('Model stop', _e);
  }
};

const getOneSaleId = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

module.exports = { addSale, getAllSales, getOneSaleId };

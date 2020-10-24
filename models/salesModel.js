const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertSale = async (itens) => {
  const db = await connection();
  const addItem = await db.collection('sales').insertOne({ itensSold: itens });
  return addItem.ops[0];
};

const findAllSales = async () => {
  const db = await connection();
  const findAll = await db.collection('sales').find().toArray();
  return { sales: findAll };
};

const findSaleById = async (id) => {
  const db = await connection();
  const findById = await db.collection('sales').findOne(ObjectId(id));
  return findById;
};

const updateSale = async (id, itemSold) => {
  const db = await connection();
  const updateItem = await db
    .collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { itemSold } });
  return updateItem;
};

module.exports = {
  insertSale,
  findAllSales,
  findSaleById,
  updateSale,
};

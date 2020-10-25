const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertSale = async (itens) => {
  const db = await connection();
  const addItem = await db.collection('sales').insertOne({ itensSold: itens });
  return addItem.ops[0];
};

const findAllSales = () => {
  const sales = connection().then((db) => db.collection('sales').find().toArray());
  return sales;
};

const findSaleById = (id) => {
  const sale = connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
  return sale;
};

const updateSale = async (id, itemSold) => {
  const db = await connection();
  const updateItem = await db
    .collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itemSold } });
  return updateItem;
};

const deleteSale = (id) => {
  connection().then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  insertSale,
  findAllSales,
  findSaleById,
  updateSale,
  deleteSale,
};

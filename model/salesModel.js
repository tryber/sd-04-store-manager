// const { ObjectId } = require('mongodb');
const { system } = require('faker');
const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSale = async (itensSold) => {
  const data = connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  return data;
};

const listSales = async () => {
  const salesList = connection().then((db) => db.collection('sales').find({}).toArray());
  return salesList;
};

const updateSale = async (id, productId, quantity) => {
  console.log('passou aqui no update', id, productId, quantity);
  await connection().then((db) =>
    db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: [{ productId, quantity }] } }),
  );
};

const findSaleById = async (id) => {
  console.log('entrou no find sale com o ID', id);
  if (!ObjectId.isValid(id)) return null;

  const saleReturned = await connection().then((db) =>
    db.collection('sales').findOne(ObjectId(id)),
  );
  console.log('aqui era o RETURNED SALE', saleReturned);
  return saleReturned;
};

module.exports = { addSale, listSales, updateSale, findSaleById };

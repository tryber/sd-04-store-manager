// const { ObjectId } = require('mongodb');
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
  await connection().then((db) =>
    db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: [{ productId, quantity }] } }),
  );
};

module.exports = { addSale, listSales, updateSale };

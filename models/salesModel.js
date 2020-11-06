const connection = require('./connection');
const { ObjectID } = require('mongodb');

const getAllSales = async () => connection().then((db) => db.collection('sales').find().toArray());

const getSaleById = async (item) => {
  if (!ObjectID.isValid(item)) return null;
  return connection().then((db) => db.collection('sales').findOne(ObjectID(item)));
};

const registerSale = async (data) => {
  const result = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: data }),
  );
  return result.ops[0];
};

const updateSale = async (id, itensSold) =>
  connection().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectID(id) }, { $set: { itensSold } }),
  );

const removeSale = async (id) =>
  connection().then((db) => db.collection('sales').deleteOne({ _id: ObjectID(id) }));

module.exports = { getAllSales, getSaleById, updateSale, registerSale, removeSale };

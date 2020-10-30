// const { ObjectId } = require('mongodb');
const { ObjectId } = require('mongodb');
const connection = require('../helpers/connection');

const create = (sales) =>
  connection()
    .then((schema) => schema.collection('sales').insertOne({ itensSold: sales }))
    .then((result) => result);

const sales = async () => {
  const response = connection().then(async (schema) => schema.collection('sales').find().toArray());

  return response;
};

const sale = (saleId) => {
  if (!ObjectId.isValid(saleId)) return Promise.reject(new Error('Wrong sale ID format'));
  return connection(saleId).then((schema) =>
    schema.collection('sales').findOne(ObjectId(saleId)));
};

const updateSale = (saleId, saleUpdate) => {
  if (!ObjectId.isValid(saleId)) return Promise.reject(new Error('Wrong sale ID format'));

  return connection().then((db) =>
    db
      .collection('sales')
      .updateOne({ _id: ObjectId(saleId) }, { $set: { itensSold: saleUpdate } }));
};

const deleteSale = (saleID) => {
  if (!ObjectId.isValid(saleID)) return Promise.reject(new Error('Wrong sale ID format'));

  return connection()
    .then((schema) => schema.collection('sales').deleteOne({ _id: ObjectId(saleID) }))
    .then((result) => result);
};

module.exports = { create, sales, updateSale, deleteSale, sale };

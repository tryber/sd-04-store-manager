const { ObjectId } = require('mongodb');
const connection = require('./connection');
const productsModel = require('./productsModel');

const findSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const findAllSales = async () =>
  connection()
    .then((db) => db.collection('sales').find().toArray());

const addSale = async (products) => {
  const result = await connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: products }));
  return result.ops[0];
};

const updateSale = async (id, product) =>
  connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold: product } },
    ));

const deleteSale = async (id) => {
  const { value } = await connection()
    .then((db) => db.collection('sales').findOneAndDelete({ _id: ObjectId(id) }));

  const { itensSold } = value;
  await productsModel.updateProductQuantity(itensSold[0].productId, itensSold[0].quantity);

  return value;
}

module.exports = {
  findSaleById,
  findAllSales,
  addSale,
  updateSale,
  deleteSale,
};

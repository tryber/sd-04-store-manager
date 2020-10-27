const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertSale = async (saleItens) => {
  const conn = await connection();
  const sales = await conn.collection('sales').insertOne({ itensSold: saleItens });
  return sales.ops[0];
};

// const getAllSales = async () => {
//   const conn = await connection();
//   return { sales: await conn.collection('sales').find().toArray() };
// };

const getAllSales = () => {
  const sales = connection().then((conn) => conn.collection('sales').find().toArray());
  return sales;
};

// const getSaleById = async (id) => {
//   const conn = await connection();
//   return conn.collection('sales').findOne(ObjectId(id));
// };

const getSaleById = (id) => {
  const sale = connection().then((conn) => conn.collection('sales').findOne(ObjectId(id)));
  return sale;
};

const updateSale = async (id, itensSold) => {
  const conn = await connection();
  const product = await conn
    .collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
  return product;
};

// const deleteSale = async (id) => {
//   const conn = await connection();
//   await conn.collection('sales').deleteOne({ _id: ObjectId(id) });
//   return true;
// };

const deleteSale = (id) => {
  connection().then((conn) => conn.collection('sales').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  insertSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};

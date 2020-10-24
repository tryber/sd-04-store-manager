const { ObjectId } = require('mongodb');
const connection = require('./connection');

const insertSale = async (salesItens) => {
  const conn = await connection();
  const sales = await conn.collection('sales').insertOne({ itensSold: salesItens });
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

module.exports = {
  insertSale,
  getAllSales,
  getSaleById,
};

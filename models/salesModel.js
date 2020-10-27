const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllSales = async () => {
  const db = await connection();
  const sales = await db.collection('sales').find().toArray();
  return sales;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));
  return sale;
};

const addSale = async (itensSold) => {
  const result = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  // o ops retorna todos os objetos que foram inseridos na operação acima.
  // Como só tem 1, pegaremos o de indice 0.
  // so funciona com insertOne. Nao funciona para UpdateOne.
  return result.ops[0];
};

// const update = async (id, name, quantity) => {
//   const db = await connection();
//   const product = await db.collection('products').updateOne({ _id: ObjectId(id) },
// { $set: { name, quantity } });
//   return product;
// };

// const remove = async (id) => {
//   const db = await connection();
//   const product = await db.collection('products').deleteOne({ _id: ObjectId(id) });
//   return product;
// };

// // removeById: deleteOne(_id: ObjectId));

module.exports = {
  getAllSales,
  getSaleById,
  //   getByName,
  addSale,
  //   update,
  //   remove,
};

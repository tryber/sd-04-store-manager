// const connection = require('./connection');
// const { ObjectID } = require('mongodb');

// const getAllSales = async () =>
//   connection().then((db) => db.collection('sales').find().toArray());

// const registerSale = async (id, quantity) => {
//   const result = await connection().then((db) =>
//     db.collection('sales').insertMany([{ id, quantity }]),
//   );
//   return result.ops[0];
// };

// module.exports = getAllSales;

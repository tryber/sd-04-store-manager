const connection = require('./connection');

const addSales = async (collections, sales) => {
  const result = connection().then((db) => db.collection(collections).insertOne(sales));
  return (await result).ops[0];
};

// Aprender sobre ObjectId

module.exports = { addSales };

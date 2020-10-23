const connection = require('../models/connection');

const newSale = async (itens) => {
  const db = await connection();
  return db.collection('sales').insertOne({ itens });
};

module.exports = {
  newSale,
};

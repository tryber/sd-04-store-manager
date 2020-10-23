const connection = require('../models/connection');

const newSale = async (itensSold) => {
  const db = await connection();
  return db.collection('sales').insertOne({ itensSold });
};

module.exports = {
  newSale,
};

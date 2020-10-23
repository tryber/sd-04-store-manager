const connection = require('./connection');

const registerSales = async (itensSold) => {
  const db = await connection();
  const sales = await db.collection('sales').insertOne({ itensSold });

  return sales.ops[0];
};

module.exports = { registerSales };

const connection = require('./connection');

const insertSale = async (salesItens) => {
  const conn = connection();
  const sales = await (await conn).collection('sales').insertOne({ itensSold: salesItens });
  return sales.ops[0];
};

module.exports = {
  insertSale,
};

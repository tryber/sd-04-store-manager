const connection = require('./connection');

const addSales = async (saleArray) => {
  try {
    const db = await connection();
    const newSale = await db.collection('sales').insertOne({ itensSold: saleArray });
    return newSale.ops[0];
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = { addSales };

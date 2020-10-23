const connection = require('./connection');
const { ObjectId } = require('mongodb');


const add = async (itensSold) => {
  try {
    const db = await connection();
    const addSales = await db.collection('sales').insertOne({ itensSold });
    return addSales.ops[0];
  } catch (err) {

    return null;
  }
};

module.exports = {
  add,
};

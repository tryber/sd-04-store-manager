const connection = require('../models/connection');

const getAll = async (table) => {
  try {
    const db = await connection();
    const products = await db.collection(table).find().toArray();
    return products;
  } catch (err) {
    return null;
  }
};

module.exports = {
  getAll,
};

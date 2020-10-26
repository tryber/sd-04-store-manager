const connection = require('../models/connection');
const { ObjectId } = require('mongodb');

const getAll = async (table) => {
  try {
    const db = await connection();
    const products = await db.collection(table).find().toArray();
    return products;
  } catch (err) {
    return null;
  }
};

const exclude = async (table, id) => {
  try {
    const db = await connection();
    await db.collection(table).deleteOne({ _id: ObjectId(id) });
    return true;
  } catch (err) {
    return null;
  }
};

module.exports = {
  getAll,
  exclude,
};

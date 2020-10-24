const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllItems = async (collection) => {
  const conn = await connection();
  const result = await conn.collection(collection).find().toArray();
  return collection === 'products' ? { products: result } : { sales: result };
};

const getItemById = async (id, collection) => {
  const conn = await connection();
  return conn.collection(collection).findOne(ObjectId(id));
};

module.exports = {
  getAllItems,
  getItemById,
};

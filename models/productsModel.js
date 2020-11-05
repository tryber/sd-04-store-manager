const { Db, ObjectId } = require('mongodb');
const connection = require('./connection');

const addProduct = async (name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );
  return result.ops[0];
};

const findByName = async (name) => {
  return await connection().then((db) => db.collection('products').findOne({ name }));
};

module.exports = {
  addProduct,
  findByName,
};

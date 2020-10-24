const connection = require('./connection');

const getAll = async () => connection().then((db) => db.collection('products').find().toArray());

const newProduct = async (name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
  return result.ops[0];
};

module.exports = { getAll, newProduct };

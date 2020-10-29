const connection = require('./connection');

// const getAll = async () => {
//   return connection().then((db) => db.collection('products').findOne());
// };

const findByName = async (collection, name) => {
  return connection().then((db) => db.collection(collection).findOne({ name }));
};

const addProduct = async (name, quantity) => {
  return connection().then((db) => db.collection('products').insertOne({ name, quantity }));
};

module.exports = { findByName, addProduct };

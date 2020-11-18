const connection = require('./connection');
const { ObjectId } = require('mongodb');

// pega o dado pelo nome
const findByName = async (name) => {
  console.log('findByName');
  return connection().then((db) => db.collection('products').findOne({ name }));
};

// adiciona o produto no db
const addProd = async (name, quantity) => {
  const products = await connection().then((db) => db.collection('products').insertOne({ name, quantity }));
  console.log(products.ops[0]);
  return products.ops[0];
};

// pega todos os produtos do db
const getAllProducts = async () => connection().then((db) => db.collection('products').find().toArray());

// pega produto pelo id no db
const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

module.exports = {
  findByName,
  addProd,
  getAllProducts,
  getProductById,
};

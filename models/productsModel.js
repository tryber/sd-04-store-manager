const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Pega um produto pelo NOME------------------------------------------------------------------
const getProductByName = async (name) =>
  connection().then((db) => db.collection('products').findOne({ name }));

// Cria um novo produto-----------------------------------------------------------------------
const createProduct = async (name, quantity) =>
  connection().then((db) => db.collection('products').insertOne({ name, quantity }));

// Lista todos os produtos--------------------------------------------------------------------
const getAllProducts = async () => {
  const allProducts = await connection().then((db) => db.collection('products').find().toArray());
  return allProducts;
};
// Lista produtos por ID----------------------------------------------------------------------
const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
};

// Exclui um produto -------------------------------------------------------------------------
const deleteProduct = async (id) =>
  ObjectId.isValid(id)
    ? connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }))
    : null;

// Atualiza um produto -----------------------------------------------------------------------
const updateProduct = async (id, name, quantity) =>
  connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );

module.exports = {
  getProductByName,
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};

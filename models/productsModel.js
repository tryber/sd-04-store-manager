const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Pega um produto pelo NOME------------------------------------------------------------------
const getProductByName = async (name) => {
  return await connection().then((db) => db.collection('products').findOne({ name }));
};

// Cria um novo produto-----------------------------------------------------------------------
const createProduct = async (name, quantity) =>
  connection().then((db) => db.collection('products').insertOne({ name, quantity }));

// Lista todos os produtos--------------------------------------------------------------------
const getAllProducts = async () =>
  connection().then((db) => db.collection('products').find().toArray());

// Lista produtos por ID----------------------------------------------------------------------
const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection().then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
};

// Exclui um produto -------------------------------------------------------------------------
const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection().then((db) =>
    db.collection('products').deleteOne({ _id: ObjectId(id) }),
  );
};

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

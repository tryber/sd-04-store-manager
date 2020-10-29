const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => connection()
  .then((db) => db.collection('products').find({}).toArray());

const postNewProduct = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then(({ insertedId }) => ({ _id: insertedId, name, quantity }));

const getProductById = async (id) => connection()
  .then((db) => db.collection('products').find({ _id: ObjectId(id) }).toArray());

const getProductByName = async (name) => connection()
  .then((db) => db.collection('products').findOne({ name }));

const putProduct = async (id, name, quantity) => connection()
  .then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }))
  .then(() => ({ _id: id, name, quantity }));

const deleteProduct = async (id) => connection()
  .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));

module.exports = {
  getAllProducts,
  postNewProduct,
  getProductById,
  putProduct,
  deleteProduct,
  getProductByName,
};

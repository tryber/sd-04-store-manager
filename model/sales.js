// const { ObjectId } = require('mongodb');
const connection = require('../helpers/connection');

const create = (sales) =>
  connection()
    .then((schema) => schema.collection('sales').insertOne({ itensSold: sales }))
    .then((result) => result);

// const products = () =>
//   connection().then(async (schema) => schema.collection('products').find().toArray());

// const product = (productId) => {
//   if (!ObjectId.isValid(productId)) return Promise.reject(new Error('Wrong id format'));

//   return connection(productId).then((schema) =>
//     schema.collection('products').findOne(ObjectId(productId)));
// };

// const updateProduct = (productId, productUpdate) => {
//   const { name, quantity } = productUpdate;
//   if (!ObjectId.isValid(productId)) return Promise.reject(new Error('Wrong id format'));

//   return connection().then((db) =>
//     db.collection('products')
// .updateOne({ _id: ObjectId(productId) }, { $set: { name, quantity } }));
// };

// const deleteProduct = (productId) => {
//   if (!ObjectId.isValid(productId)) return Promise.reject(new Error('Wrong id format'));

//   return connection()
//     .then((schema) => schema.collection('products').deleteOne({ _id: ObjectId(productId) }))
//     .then((result) => result);
// };

module.exports = { create };

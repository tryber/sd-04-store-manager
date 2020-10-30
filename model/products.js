const { ObjectId } = require('mongodb');
const connection = require('../helpers/connection');

const createProduct = async (product) => {
  try {
    const productId = await connection().then((schema) =>
      schema.collection('products').insertOne(product),
    );

    return productId.insertedId;
  } catch (error) {
    return error;
  }
};

const products = async () =>
  connection().then((schema) => schema.collection('products').find({}).toArray());

const product = async () =>
  connection(id).then((schema) => schema.collection('products').find({}).toArray());

const updateProduct = async (productId, name, quantity) => {
  try {
    const product = await product(productId);

    if (!product) return null;

    const result = await connection().then((db) =>
      db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
    );

    return result;
  } catch (error) {
    return error;
  }
};

const deleteProduct = async (productId) => {
  try {
    return connection().then((schema) =>
      schema.collection('products').deleteOne({ _id: ObjectId(productId) }),
    );
  } catch (error) {
    return error;
  }
};

module.exports = { createProduct, products, product, updateProduct, deleteProduct };

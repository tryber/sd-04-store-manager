const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () =>
  connection()
    .then((db) => db.collection('products').find().toArray())
    .catch((err) => {
      console.error(err);
      return process.exit(1);
    });

const findByName = async (name) => {
  try {
    const db = await connection();
    const product = await db.collection('products').findOne({ name });
    console.log(product);
    return product;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};
const findById = async (id) => {
  try {
    if (!ObjectID.isValid(id)) {
      return null;
    }
    const db = await connection();
    const product = await db.collection('products').findOne(ObjectID(id));
    console.log(product);
    return product;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};
const insertProduct = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, name, quantity }))
    .catch((err) => console.error(err));

module.exports = { getAllProducts, insertProduct, findByName, findById };

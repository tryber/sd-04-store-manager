const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () =>
  connection()
    .then((db) => db.collection('products').find().toArray())
    .catch((err) => {
      throw err;
    });

const getProductById = async (id) =>
  connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .catch((err) => {
      throw err;
    });

const addProduct = async (name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );

  return result.ops[0];
};

const removeProduct = async (id) => {
  if (!(await getProductById(id))) return false;
  await connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
  return true;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  removeProduct,
};

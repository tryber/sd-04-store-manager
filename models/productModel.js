const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () =>
  connection()
    .then((db) => db.collection('products').find().toArray())
    .catch((err) => {
      throw err;
    });

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .catch((err) => {
      throw err;
    });
};

const getProductByName = async (name) =>
  connection()
    .then((db) => db.collection('products').findOne({ name }))
    .catch((err) => {
      throw err;
    });

const addProduct = async (name, quantity) => {
  const result = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .catch((err) => {
      throw err;
    });

  return result.ops[0];
};

const removeProduct = async (id) => {
  if (!(await getProductById(id))) return false;

  await connection().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
  return true;
};

const updateProduct = async (id, name, quantity) => {
  if (!(await getProductById(id))) return false;

  await connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return true;
};

module.exports = {
  getAllProducts,
  getProductById,
  getProductByName,
  addProduct,
  removeProduct,
  updateProduct,
};

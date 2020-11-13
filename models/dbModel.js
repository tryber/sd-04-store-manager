const { ObjectID } = require('mongodb');
const connection = require('./connection');

const getAll = async (collection) =>
  connection()
    .then((db) => db.collection(collection).find().toArray())
    .catch((err) => {
      console.error(err);
      return process.exit(1);
    });

const findByName = (name, collection) =>
  connection()
    .then((db) => db.collection(collection).findOne({ name }))
    .catch((err) => {
      console.error(err);
      return process.exit(1);
    });

const findById = async (id, collection) => {
  try {
    if (!ObjectID.isValid(id)) {
      return null;
    }
    const db = await connection();
    const product = await db.collection(collection).findOne(ObjectID(id));
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

const updateProduct = async (id, name, quantity) =>
  connection()
    .then((db) =>
      db.collection('products').updateOne({ _id: ObjectID(id) }, { $set: { name, quantity } }),
    )
    .then(() => ({ _id: id, name, quantity }))
    .catch((err) => console.error(err));

const deleteProduct = async (id, collection) => {
  try {
    if (!ObjectID.isValid(id)) {
      return null;
    }
    const db = await connection();
    const product = await db.collection(collection).deleteOne({ _id: ObjectID(id) });
    return product;
  } catch (err) {
    console.error(err);
    return process.exit(1);
  }
};
const insertSale = async (itensSold) =>
  connection()
    .then((db) => db.collection('sales').insertOne({ name, quantity }))
    .then((result) => ({ _id: result.insertedId, itensSold }))
    .catch((err) => console.error(err));

module.exports = {
  getAll,
  insertProduct,
  findByName,
  findById,
  updateProduct,
  deleteProduct,
  insertSale,
};

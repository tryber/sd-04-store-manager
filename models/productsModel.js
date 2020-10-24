const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addProduct = async (name, quantity) => {
  const db = await connection();
  const addItem = await db.collection('products').insertOne({ name, quantity });
  return addItem.ops[0];
};

const findAll = async () => {
  const db = await connection();
  const findAllItems = await db.collection('products').find().toArray();
  return { products: findAllItems };
};

const findById = async (productId) => {
  const db = await connection();
  const findByIdItem = await db.collection('products').findOne(ObjectId(productId));
  return findByIdItem;
};

const findByName = async (name) => {
  const db = await connection();
  const findItem = await db.collection('products').findOne({ name });
  return findItem;
};

const updateValues = async (id, name, quantity) => {
  const db = await connection();
  const updateItem = await db
    .collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return updateItem;
};

const deleteById = async (id) => {
  const db = await connection();
  const productBeforeDelete = await findById(id);
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return productBeforeDelete;
};

module.exports = {
  addProduct,
  findAll,
  findById,
  findByName,
  updateValues,
  deleteById,
};

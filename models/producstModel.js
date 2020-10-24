const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  try {
    const db = await connection();
    const products = await db.collection('products').find().toArray();
    return products;
  } catch (err) {
    return null;
  }
};

const getByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const getById = async (id) => {
  try {
    const db = await connection();
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) });
    return product;
  } catch (err) {
    return null;
  }
}

const add = async (name, quantity) => {
  try {
    const db = await connection();
    const addProduct = await db.collection('products').insertOne({ name, quantity });
    return addProduct.ops[0];
  } catch (err) {
    return null;
  }
};

const update = async (id, name, quantity) => {
  try {
    const db = await connection();
    await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
    const product = await getById(id);
    return product;
  } catch (err) {
    return null;
  }
};

const exclude = async (id) => {
  try {
    const db = await connection();
    await db.collection('products').deleteOne({ _id: ObjectId(id) });
    return true;
  } catch (err) {
    return null;
  }
};

module.exports = {
  getAll,
  getByName,
  getById,
  add,
  update,
  exclude,
};

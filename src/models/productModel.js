const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addProduct = async (name, quantity) => {
  try {
    const db = await connection();
    const newProduct = await db.collection('products').insertOne({ name, quantity });
    return newProduct.ops[0];
  } catch (err) {
    console.error(err);
  }
};

const listProducts = async () => {
  try {
    const db = await connection();
    return await db.collection('products').find({}).toArray();
  } catch (err) {
    console.error(err);
    return [];
  }
};

const findProductById = async (id) => {
  try {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();
    return db.collection('products').findOne(ObjectId(id));
  } catch (err) {
    console.error(err);
    return false;
  }
};

const updateProduct = async (id, name, quantity) => {
  try {
    if (!(await findProductById(id))) return false;

    const db = await connection();
    await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const deleteProduct = async (id) => {
  try {
    if (!(await findProductById(id))) return false;

    const db = await connection();
    await db.collection('products').deleteOne({ _id: ObjectId(id) });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = { addProduct, listProducts, findProductById, updateProduct, deleteProduct };

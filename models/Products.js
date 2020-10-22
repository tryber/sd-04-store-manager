const connection = require('./connection');
const { ObjectId } = require('mongodb');

const dbCollection = 'products';

const addProduct = async (name, quantity) => {
  try {
    const db = await connection();
    const addResult = await db.collection(dbCollection)
      .insertOne({ name, quantity });
    return {
      _id: addResult.insertedId,
      name: addResult.ops[0].name,
      quantity: addResult.ops[0].quantity,
    };
  } catch (error) {
    return process.exit(1);
  }
};

const findAll = async () => {
  try {
    const db = await connection();
    const findAllResult = await db.collection(dbCollection).find().toArray();
    return { products: findAllResult };
  } catch (error) {
    return process.exit(1);
  }
};

const findById = async (productId) => {
  try {
    const db = await connection();
    const findByIdResult = await db.collection(dbCollection)
      .findOne({ _id: ObjectId(productId) });
    return findByIdResult;
  } catch (error) {
    return process.exit(1);
  }
};

const findByName = async (name) => {
  try {
    const db = await connection();
    const findResult = await db.collection(dbCollection)
      .findOne({ name });
    return findResult;
  } catch (error) {
    return process.exit(1);
  }
};

module.exports = {
  addProduct,
  findAll,
  findById,
  findByName,
};

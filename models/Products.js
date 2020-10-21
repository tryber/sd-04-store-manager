const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const addProduct = async (name, quantity) => {
  try {
    const db = await connection();
    const addResult = await db.collection('products')
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

const findByName = async (name) => {
  try {
    const db = await connection();
    const findResult = await db.collection('products')
      .findOne({ name });
    return findResult;
  } catch (error) {
    return process.exit(1);
  }
};

module.exports = {
  addProduct,
  findByName,
};

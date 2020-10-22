const connection = require('./connection');
const { ObjectId } = require('mongodb');

const dbCollection = 'sales';

const addSales = async (itensSold) => {
  try {
    const db = await connection();
    const addResult = await db.collection(dbCollection)
      .insertOne({ itensSold });
    return {
      _id: addResult.insertedId,
      itensSold,
    };
  } catch (error) {
    return process.exit(1);
  }
};

const findAll = async () => {
  try {
    const db = await connection();
    const findAllResult = await db.collection(dbCollection).find().toArray();
    console.log(findAllResult);
    return {
      sales: findAllResult,
    };
  } catch (error) {
    return process.exit(1);
  }
};

const findById = async (saleId) => {
  if (!ObjectId.isValid(saleId)) {
    return null;
  }
  try {
    const db = await connection();
    const findByIdResult = await db.collection(dbCollection)
      .findOne(ObjectId(saleId));
    return findByIdResult;
  } catch (error) {
    return process.exit(1);
  }
};

module.exports = {
  addSales,
  findAll,
  findById,
};

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

const updateSale = async (id, itensSold) => {
  try {
    const db = await connection();
    await db.collection(dbCollection)
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
    return {
      _id: id,
      itensSold,
    };
  } catch (error) {
    return process.exit(1);
  }
};

const deleteSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  try {
    const db = await connection();
    const saleBeforeDelete = await findById(id);
    await db.collection(dbCollection)
      .deleteOne({ _id: ObjectId(id) });
    return saleBeforeDelete;
  } catch (error) {
    return process.exit(1);
  }
};

module.exports = {
  addSales,
  findAll,
  findById,
  updateSale,
  deleteSaleById,
};

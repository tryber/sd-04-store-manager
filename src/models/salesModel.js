const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addSales = async (saleArray) => {
  try {
    const db = await connection();
    const newSale = await db.collection('sales').insertOne({ itensSold: saleArray });
    return newSale.ops[0];
  } catch (err) {
    console.error(err);
    return false;
  }
};

const listSales = async () => {
  try {
    const db = await connection();
    return await db.collection('sales').find({}).toArray();
  } catch (err) {
    console.error(err);
    return [];
  }
};

const findSaleById = async (id) => {
  try {
    if (!ObjectId.isValid(id)) return null;
    const db = await connection();
    return db.collection('sales').findOne(ObjectId(id));
  } catch (err) {
    console.error(err);
    return false;
  }
};

const updateSale = async (id, saleUpdate) => {
  try {
    if (!(await findSaleById(id))) return false;
    const db = await connection();
    await db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: saleUpdate } });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const deleteSale = async (id) => {
  try {
    if (!(await findSaleById(id))) return false;

    const db = await connection();
    await db.collection('sales').deleteOne({ _id: ObjectId(id) });

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = { addSales, listSales, findSaleById, updateSale, deleteSale };

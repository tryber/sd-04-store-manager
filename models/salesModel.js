const connection = require('./connections');
const { ObjectId } = require('mongodb');

const addSale = async (itensSold) => {
  try {
    const result = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));
    return result.ops[0];
  } catch (_e) {
    console.log('Model stop', _e);
  }
};

const getAllSales = async () => {
  try {
    const sales = await connection().then((db) => db.collection('sales').find().toArray());
    return sales;
  } catch (_e) {
    console.log('Model stop', _e);
  }
};

const getOneSaleId = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const update = async (id, itensSold) => {
  if (!getOneSaleId(id)) return false;
  await connection().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }),
  );
};

const remove = async (id) => {
  if (!getOneSaleId(id)) return null;
  const db = await connection();
  const deleted = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return deleted;
};

module.exports = { addSale, getAllSales, getOneSaleId, update, remove };

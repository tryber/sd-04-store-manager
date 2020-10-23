const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllSales = async () =>
  connection()
    .then((db) => db.collection('sales').find().toArray())
    .catch((err) => {
      throw err;
    });

const getSaleById = async (id) => {
  const idIsValid = ObjectId(id);
  if (!idIsValid) return false;
  const db = await connection();
  return db
    .collection('sales')
    .findOne(ObjectId(id))
    .catch((err) => {
      throw err;
    });
};

const addSale = async (itensSold) => {
  const db = await connection();
  const result = await db
    .collection('sales')
    .insertOne({ itensSold })
    .catch((err) => {
      throw err;
    });

  return result.ops[0];
};

const updateSale = async (id, sale) => {
  if (!(await getSaleById(id))) return false;

  await connection().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectId(id) }, { sale }));
  return true;
};

const removeSale = async (id) => {
  const sale = await getSaleById(id);

  if (!sale) return false;

  const db = await connection();

  await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return sale;
};

module.exports = {
  getAllSales,
  getSaleById,
  addSale,
  removeSale,
  updateSale,
};

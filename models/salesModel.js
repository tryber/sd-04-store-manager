const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () =>
  connection().then((db) => db.collection('sales').find({}).toArray());

const addSales = async (itensSold) => {
  const result = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  return result.ops[0];
};

const updateSale = async (id, sale) => {
  await connection().then((db) =>
    db
      .collection('sales')
      .updateOne(
        { _id: ObjectId(id), 'itensSold.productId': sale[0].productId },
        { $set: { 'itensSold.0.quantity': sale[0].quantity } },
      ),
  );
};

module.exports = {
  getAll,
  addSales,
  updateSale,
};

const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getSales = async () => connection().then((db) => db.collection('sales').find().toArray());

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const sale = await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
  return sale;
};

const addSale = async (products) => {
  const result = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: products }),
  );

  return result.ops[0];
};

const updateSale = async (id, productId, quantity) => {
  if (!(await getSaleById(id))) return false;
  await connection().then((db) =>
    db
      .collection('sales')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { 'itensSold.0.productId': productId, 'itensSold.0.quantity': quantity } },
      ),
  );
  return true;
};

const removeSale = async (id) => {
  if (!(await getSaleById(id))) return false;
  await connection().then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
  return true;
};

module.exports = {
  getSales,
  getSaleById,
  addSale,
  updateSale,
  removeSale,
};

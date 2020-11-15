const connection = require('./connection');
const { ObjectId } = require('mongodb');

const addSale = async (itensSold) => {
  const result = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  return result.ops[0];
};

function getAllSales() {
  return connection().then((db) => db.collection('sales').find().toArray());
}

const getSaleById = async (id) => {
  if (ObjectId.isValid(id)) {
    return connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
  }

  return null;
};

const updateSale = async (id, itensSold) =>
  connection().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }),
  );

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const result = await connection().then((db) =>
    db.collection('sales').deleteOne({ _id: ObjectId(id) }),
  );
  return result;
};

module.exports = { addSale, getAllSales, getSaleById, updateSale, deleteSale };

const connection = require('./connection');
const { ObjectId } = require('mongodb');

const listSales = async () => {
  const data = await connection().then((db) => db.collection('sales').find({}).toArray());
  return data;
};

const listSaleById = async (id) => {
  try {
    const data = await connection().then((db) =>
      db
        .collection('sales')
        .find({ _id: ObjectId(id) })
        .toArray(),
    );
    return data;
  } catch (err) {
    return 'erro';
  }
};

listSaleById();
const registerSale = async (itensSold) => {
  const data = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  return data.ops[0];
};

module.exports = {
  registerSale,
  listSales,
  listSaleById,
};

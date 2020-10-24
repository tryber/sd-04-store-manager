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

const registerSale = async (itensSold) => {
  const data = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  return data.ops[0];
};

const updateSaleModel = async (id, productId, quantity) => {
  const myQuery = { _id: ObjectId(id) };
  const newValues = { $set: { itensSold: [{ productId, quantity }] } };

  await connection().then((db) => db.collection('sales').updateOne(myQuery, newValues));
};

const deleteModel = async (id) => {
  await connection().then((db) =>
    db.collection('sales').deleteOne({ _id: ObjectId(id) }, (err) => {
      if (err) throw err;
      console.log('1 document deleted');
    }),
  );
};

module.exports = {
  registerSale,
  listSales,
  listSaleById,
  updateSaleModel,
  deleteModel,
};

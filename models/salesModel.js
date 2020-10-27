// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllSales = async () => {
  const db = await connection();
  return db.collection('sales').find().toArray();
};
// getByNameasync (name) => connection().then((db) => db.collection('products').findOne({ name }));
// getByIdasync (id) => connection().then((db) => db.collection('products').findOne(ObjectId(id)));

const add = async (itensSold) => {
  const result = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold }));
  const sales = Object.fromEntries(
    Object.entries(result.ops[0]).sort(),
  );
  return sales;
};

/* const update = async (id, name, quantity) => {
  const result = await connection().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  if (result.result.ok !== 1) {
    return 'Could not update';
  }
  const product = {
    _id: ObjectId(id),
    name,
    quantity,
  };
  return product;
}; */

/* const del = async (id) => {
  const result = await connection().then((db) =>
    db.collection('products').deleteOne({ _id: ObjectId(id) }));
  return result.result;
}; */

module.exports = {
  add,
  getAllSales,
  // getById,
  // getByName,
  // update,
  // del,
};

const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = async (itensSold) => {
  const result = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  return result.ops[0];
};

const getAll = async () => {
  const result = await connection().then((db) => db.collection('sales').find().toArray());
  return result;
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return false;

  const result = await connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
  return result;
};

const update = async (id, productId, quantity) => {
  await connection().then((db) =>
    db
      .collection('sales')
      .updateOne(
        { _id: ObjectId(id), 'itensSold.productId': productId },
        { $set: { 'itensSold.0.quantity': quantity } },
      ),
  );
};

const remove = async (id) => {
  await connection().then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  add,
  getAll,
  findById,
  update,
  remove,
};

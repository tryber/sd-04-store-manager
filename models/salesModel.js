const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = async (...itensSold) => {
  const result = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  return result.ops[0];
};

const update = async (id, ...up) =>
  connection().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold: up } }));

module.exports = {
  add,
  update,
};

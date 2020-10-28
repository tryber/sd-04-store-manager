const connection = require('./connection');

const getAll = async (collection) =>
  connection().then((db) => db.collection(collection).find().toArray());

const add = async (collection, ...itensSold) => {
  let data = { itensSold };
  if (collection === 'products') data = { name: itensSold[0].name, quantity: itensSold[0].quantity };
  const result = await connection().then((db) => db.collection(collection).insertOne(data));
  return result.ops[0];
};

module.exports = {
  getAll,
  add,
};

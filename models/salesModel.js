const connection = require('./connection');
const { ObjectID } = require('mongodb');

const registerSale = async (id, quantity) => {
  const result = await connection().then((db) =>
    db.collection('sales').insertMany([{ id, quantity }]),
  );
  return result.ops[0];
};

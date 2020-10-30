// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const add = async (itensSold) => {
  const result = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold }),
  );
  return result.ops[0];
};

module.exports = { add };

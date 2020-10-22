const connection = require('./connection');

const addSale = async (products) => {
  const result = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: products }),
  );

  return result.ops[0];
};

module.exports = {
  addSale,
};

const connection = require('./connection');

/* const listSales = async () => {
  const data = await connection().then((db) => db.collection('sales').find().toArray());
  return data;
}; */

const cadastraVenda = async (itensSold) => {
  const data = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  return data.ops[0];
};

module.exports = {
  cadastraVenda,
};

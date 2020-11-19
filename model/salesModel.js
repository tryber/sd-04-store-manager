const { ObjectId } = require('mongodb');
const connection = require('./connection');

// add produto no db de vendas
const addSale = async (itensSold) => {
  const itens = connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  return itens;
};

// listar todas as vendas
const listAllSales = async () => {
  const list = connection().then((db) => db.collection('sales').find({}).toArray());
  return list;
};
// lista uma venda
const findSale = async (id) => {
  console.log(id);
  // if (!ObjectId.isValid(id)) return null

  const specificSale = await connection().then((db) =>
    db.collection('sales').findOne(ObjectId(id)),
  );
  return specificSale;
};
module.exports = {
  addSale,
  listAllSales,
  findSale,
};

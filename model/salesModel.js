const { ObjectId } = require('mongodb');
const connection = require('./connection');
const productModel = require('../model/productsModel')

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

// atualizar pedido
const updateSale = async (id, productId, quantity) => {
  await connection().then((db) =>
    db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: [{ productId, quantity }] } }),
  );
};

// pega a venda pelo id no db
const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

// deleta venda do db
const deleteSale = async (id) => {
  const { value } = await connection().then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
  const { itensSold } = value;
  await productModel.updateProduct(itensSold[0].productId, itensSold[0].quantity);
  return value;
};

module.exports = {
  addSale,
  listAllSales,
  findSale,
  updateSale,
  getSaleById,
  deleteSale,
};

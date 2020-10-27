const { ObjectId } = require('mongodb');
const connection = require('./connection');

// Cria uma nova venda------------------------------------------------------------------------
const createSale = async (itensSold) => {
  const result = await connection().then((db) => db.collection('sales').insertOne({ itensSold }));
  return result.ops[0];
};

// Lista todas as vendas--------------------------------------------------------------------
const getAllSales = async () => connection().then((db) => db.collection('sales').find().toArray());

// Lista vendas por ID----------------------------------------------------------------------
const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection().then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

// Atualiza uma venda -----------------------------------------------------------------------
const updateSale = async (id, itensSold) =>
  connection().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }),
  );

// Exclui uma venda -------------------------------------------------------------------------
const deleteSale = async (id) => 
  // if (!ObjectId.isValid(id)) return null;
   connection().then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));


module.exports = { createSale, getAllSales, getSaleById, updateSale, deleteSale };

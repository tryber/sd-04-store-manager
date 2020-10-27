const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');

/* eslint-disable no-param-reassign, no-underscore-dangle */

const insertSale = async (saleItens, insertSaleRecord) => {
  const productsResult = [];
  for (let i = 0; i < saleItens.length; i += 1) {
    const productToSell = productsModel.getProductById(saleItens[i].productId);
    productsResult.push(productToSell);
  }

  const productsToSell = await Promise.all(productsResult);

  for (let i = 0; i < productsToSell.length; i += 1) {
    productsModel.updateProduct(
      saleItens[i].productId,
      productsToSell[i].name,
      productsToSell[i].quantity - saleItens[i].quantity,
    );
  }

  let sales;
  if (insertSaleRecord) {
    sales = await salesModel.insertSale(saleItens);
  }

  return sales;
};

const deleteSale = async (saleId, deleteSaleRecord) => {
  const saleToDelete = await salesModel.getSaleById(saleId);

  const productsResult = [];
  for (let i = 0; i < saleToDelete.itensSold.length; i += 1) {
    const productSold = productsModel.getProductById(saleToDelete.itensSold[i].productId);
    productsResult.push(productSold);
  }

  const productsToDelete = await Promise.all(productsResult);

  for (let i = 0; i < productsToDelete.length; i += 1) {
    productsModel.updateProduct(
      productsToDelete[i]._id,
      productsToDelete[i].name,
      productsToDelete[i].quantity + saleToDelete.itensSold[i].quantity,
    );
  }

  if (deleteSaleRecord) {
    await salesModel.deleteSale(saleId);
  }

  return saleToDelete;
};

const updateSale = async (id, saleItens) => {
  await deleteSale(id, false);
  await insertSale(saleItens, false);
  await salesModel.updateSale(id, saleItens);
  const updatedSale = await salesModel.getSaleById(id);

  return updatedSale;
};

module.exports = {
  insertSale,
  updateSale,
  deleteSale,
};

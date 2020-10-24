const { insertSalesMod, getAllSalesMod, getByIdSalesMod } = require('../models/salesModel');

const notFound = (message) => ({ err: { code: 'not_found', status: 404, message } });

const insertSalesServ = async (itensSold) => {
  const insertSales = await insertSalesMod(itensSold);
  return insertSales;
};

const getAllSalesServ = async () => {
  const getAllSales = await getAllSalesMod();
  return getAllSales;
};

const getByIdSalesServ = async (id) => {
  const productId = await getByIdSalesMod(id);
  if (!productId) {
    return notFound('Sale not found');
  }
  return productId;
};

module.exports = { insertSalesServ, getAllSalesServ, getByIdSalesServ };

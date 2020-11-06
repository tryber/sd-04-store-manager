const { ObjectId } = require('mongodb');
const { getByIdSalesMod, deleteSalesMod } = require('../models/salesModel');

const notFound = (message) => ({ err: { code: 'not_found', status: 404, message } });
const invalidData = (message) => ({ err: { code: 'invalid_data', status: 422, message } });

const getByIdSalesServ = async (id) => {
  const productId = await getByIdSalesMod(id);
  if (!productId) {
    return notFound('Sale not found');
  }
  return productId;
};

const deleteSalesServ = async (id) => {
  if (!ObjectId.isValid(id)) {
    return invalidData('Wrong sale ID format');
  }

  const saleID = await getByIdSalesServ(id);
  const deleteSale = await deleteSalesMod(id);

  if (deleteSale.deletedCount === 0) {
    return notFound('Sale not Found');
  }

  return saleID;
};

module.exports = { getByIdSalesServ, deleteSalesServ };

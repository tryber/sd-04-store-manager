const { getByIdSalesMod } = require('../models/salesModel');

const notFound = (message) => ({ err: { code: 'not_found', status: 404, message } });

const getByIdSalesServ = async (id) => {
  const productId = await getByIdSalesMod(id);
  if (!productId) {
    return notFound('Sale not found');
  }
  return productId;
};

module.exports = { getByIdSalesServ };

const Sales = require('../models/Sales');
const productService = require('./productService');

const objectErro = {
  err: {
    code: 'not_found',
    message: 'Sale not found',
  },
};

const reformatErrorMessage = (errorObject) => {
  if (errorObject) {
    return {
      ...errorObject,
      err: {
        ...errorObject.err,
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }

  return null;
};

const addSales = async (salesArray) => {
  const { quantity } = salesArray[0];
  const quantityValidation = await productService.avaliateQuantity(quantity);
  const quantityIsInvalid = reformatErrorMessage(quantityValidation);

  if (quantityIsInvalid) {
    return quantityIsInvalid;
  }

  const addSaleResultResponse = await Sales.addSales(salesArray);

  return addSaleResultResponse;
};

const listSales = async () => Sales.findAll();

const showASpecificSaleById = async (id) => {
  const saleResult = await Sales.findById(id);

  if (!saleResult) {
    return objectErro;
  }

  return saleResult;
};

module.exports = {
  addSales,
  listSales,
  showASpecificSaleById,
};

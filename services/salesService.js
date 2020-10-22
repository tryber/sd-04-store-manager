const Sales = require('../models/Sales');
const productService = require('./productService');

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

module.exports = {
  addSales,
};

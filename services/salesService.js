const Sales = require('../models/Sales');
const productService = require('./productService');

const objectErro = {
  err: {
    code: 'not_found',
    message: 'Sale not found',
  },
};

const objectDeleteErro = {
  err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
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
  const { quantity, productId } = salesArray[0];
  const quantityValidation = await productService.avaliateQuantity(quantity);
  const quantityIsInvalid = reformatErrorMessage(quantityValidation);

  if (quantityIsInvalid) {
    return quantityIsInvalid;
  }

  const addSaleResultResponse = await Sales.addSales(salesArray);
  const { quantity: productQuantity } = await productService.showASpecificProductById(productId);

  productService.updateProductQuantity(productId, (productQuantity - quantity));

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

const deleteASale = async (id) => {
  const saleResultOfDeletion = await Sales.deleteSaleById(id);

  if (saleResultOfDeletion === null) {
    return objectDeleteErro;
  }
  const { productId, quantity } = saleResultOfDeletion.itensSold[0];
  const { quantity: productQuantity } = await productService.showASpecificProductById(productId);

  productService.updateProductQuantity(productId, (productQuantity + quantity));

  return saleResultOfDeletion;
};

const updateASale = async (id, itensSold) => {
  const { quantity } = itensSold[0];
  const quantityValidation = await productService.avaliateQuantity(quantity);
  const quantityIsInvalid = reformatErrorMessage(quantityValidation);

  if (quantityIsInvalid) {
    return quantityIsInvalid;
  }

  const updateSaleResponse = await Sales.updateSale(id, itensSold);

  return updateSaleResponse;
};

module.exports = {
  addSales,
  listSales,
  showASpecificSaleById,
  deleteASale,
  updateASale,
};

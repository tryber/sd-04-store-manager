const productModel = require('../model/productModel');

const PRODUCT_NAME = /^.{5,}$/;
const PRODUCT_QUANTITY = /^[1-9]\d*$/;
const VALIDA_MESSAGE = {
  code: 'invalid_data',
  message: '',
};

const validaRegex = (string, regex) => string.match(regex);

const validaNome = async (name) => {
  const produto = await productModel.getByName(name);

  if (!validaRegex(name, PRODUCT_NAME)) {
    VALIDA_MESSAGE.message = `${name} length must be at least 5 characters long`;
  } else if (produto) {
    VALIDA_MESSAGE.message = 'Product already exists';
  } else VALIDA_MESSAGE.message = '';

  return VALIDA_MESSAGE;
};

const validaQuantidade = (quantity) => {
  if (!validaRegex(quantity.toString(), PRODUCT_QUANTITY) && typeof quantity === 'number') {
    VALIDA_MESSAGE.message = '"quantity" must be larger than or equal to 1';
  } else if (typeof quantity !== 'number') {
    VALIDA_MESSAGE.message = '"quantity" must be a number';
  }
  return VALIDA_MESSAGE;
};

module.exports = {
  validaQuantidade,
  validaNome,
};

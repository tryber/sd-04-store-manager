const productModel = require('../model/productModel');

const PRODUCT_QUANTITY = /^[1-9]\d*$/;

const VALIDA_SALES = {
  code: 'invalid_data',
  message: '',
};

const validaRegex = (string, regex) => string.match(regex);
// teste novo pull
const validaQuantidade = (quantity) => {
  if (!validaRegex(quantity.toString(), PRODUCT_QUANTITY) && typeof quantity === 'number') {
    VALIDA_SALES.message = 'Wrong product ID or invalid quantity';
  } else if (typeof quantity !== 'number') {
    VALIDA_SALES.message = 'Wrong product ID or invalid quantity';
  } else VALIDA_SALES.message = '';
  return VALIDA_SALES;
};

const validaExist = async (id) => {
  const produto = await productModel.getById(id);

  if (!produto) throw new Error('Wrong product ID or invalid quantity');
  else VALIDA_SALES.message = '';

  return VALIDA_SALES;
};

module.exports = {
  validaQuantidade,
  validaExist,
};

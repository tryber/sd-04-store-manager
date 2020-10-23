const productModel = require('../model/productModel');

const PRODUCT_NAME = /^.{5,}$/;
const PRODUCT_QUANTITY = /^[1-9]\d*$/;
const VALIDA_NOME = {
  code: 'invalid_data',
  message: '',
};

const VALIDA_QUANTIDADE = {
  code: 'invalid_data',
  message: '',
};

const VALIDA_PRODUCT = {
  code: 'invalid_data',
  message: '',
};

const validaRegex = (string, regex) => string.match(regex);

const validaNome = async (name, id) => {
  const produto = await productModel.getByName(name);

  if (!validaRegex(name, PRODUCT_NAME)) {
    VALIDA_NOME.message = '"name" length must be at least 5 characters long';
  } else if (produto && !id) {
    VALIDA_NOME.message = 'Product already exists';
  } else VALIDA_NOME.message = '';

  return VALIDA_NOME;
};

const validaQuantidade = (quantity) => {
  if (!validaRegex(quantity.toString(), PRODUCT_QUANTITY) && typeof quantity === 'number') {
    VALIDA_QUANTIDADE.message = '"quantity" must be larger than or equal to 1';
  } else if (typeof quantity !== 'number') {
    VALIDA_QUANTIDADE.message = '"quantity" must be a number';
  } else VALIDA_QUANTIDADE.message = '';
  return VALIDA_QUANTIDADE;
};

const validaExist = async (id) => {
  const produto = await productModel.getById(id);

  if (!produto) VALIDA_PRODUCT.message = 'Wrong id format';
  else VALIDA_PRODUCT.message = '';

  return { VALIDA_PRODUCT, produto };
};

module.exports = {
  validaExist,
  validaQuantidade,
  validaNome,
};

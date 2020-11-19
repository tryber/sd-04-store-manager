const produtoModel = require('../models/produtoModel');

// Valida Nome do produto
const validaName = async (update = false, productName) => {
  const name = update ? [] : await produtoModel.findProdutoByName(productName);

  switch (true) {
    case productName.length < 5:
      return {
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long',
        },
      };
    case name.length > 0:
      return {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      };
    default:
      return true;
  }
};

// Valida Quantidade do produto
const validaQuantity = (pQuantity) => {
  switch (true) {
    case pQuantity <= 0:
      return {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        },
      };
    case typeof pQuantity === 'string':
      return {
        err: {
          code: 'invalid_data',
          message: '"quantity" must be a number',
        },
      };
    default:
      return true;
  }
};

// Valida produto
const validaProduto = async (name, quantity, update) => {
  const validaNameProduto = await validaName(update, name);
  const validaQtyProduto = validaQuantity(quantity);

  if (validaNameProduto.err) return validaNameProduto;

  if (validaQtyProduto.err) return validaQtyProduto;

  return true;
};

module.exports = validaProduto;

const { produtoModel } = require('../models');
const { productValidation } = require('../validations');

const getAllProdutos = async () => produtoModel.getAllProdutos();

const criarProduto = async (name, quantity) => {
  const invalid = await productValidation(name, quantity);

  if (invalid.err) return invalid;

  return produtoModel.createProduct(name, quantity);
};

const upProduto = async (id, name, quantity) => {
  const invalid = await productValidation(name, quantity, true);

  if (invalid.err) return invalid;

  return produtoModel.updateProduct(id, name, quantity);
};

const getProdutoById = async (id) => {
  if (id.length < 24) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  const produtoId = await produtoModel.getProductById(id);

  if (produtoId.length === 0) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  return produtoId;
};

const deleteProduto = async (id) => {
  if (id.length < 24) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  await produtoModel.deleteProduct(id);
};

module.exports = {
  getAllProdutos,
  criarProduto,
  getProdutoById,
  upProduto,
  deleteProduto,
};

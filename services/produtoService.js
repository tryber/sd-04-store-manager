const { produtoModel } = require('../models');
const { produtoValidation } = require('../validations');

const getAllProdutos = async () => produtoModel.getAllProdutos();

const criarProduto = async (name, quantity) => {
  const isValid = await produtoValidation.validaProduto(name, quantity);

  if (isValid.err) return isValid;

  return produtoModel.criarProduto(name, quantity);
};

const upProduto = async (id, name, quantity) => {
  const isValid = await produtoValidation.validaProduto(name, quantity, true);

  if (isValid.err) return isValid;

  return produtoModel.upProduto(id, name, quantity);
};

const findProdutoById = async (id) => {
  if (id.length < 24) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  const produtoId = await produtoModel.findProdutoById(id);

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

  await produtoModel.deleteProduto(id);
};

module.exports = {
  getAllProdutos,
  criarProduto,
  findProdutoById,
  upProduto,
  deleteProduto,
};

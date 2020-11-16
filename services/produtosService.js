const { produtosModel } = require('../models');

const getAllProdutos = async () => produtosModel.getAllProducts();

module.exports = {
  getAllProdutos,
};

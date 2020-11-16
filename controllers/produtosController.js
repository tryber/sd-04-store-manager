const { produtosService } = require('../services');

const getAll = async (_req, res) => {
  const produtos = await produtosService.getAllProdutos();

  return res.status(200).json({ produtos });
};

module.exports = {
  getAll,
};

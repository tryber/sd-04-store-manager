const { cadastro, findAll, findById } = require('../models/productsModels');


const cadastroProduto = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const cad = await cadastro({ name, quantity });

    return res.status(201).json(cad);
  } catch (_e) {
    res.status(500).json({ err: { code: 'invalid_data', message: 'Erro inesperado' } });
  }
};

const listaDeProdutos = async (_req, res) => {
  const produtos = await findAll();

  if (!produtos) return res.status(404).json({ err: { code: 'invalid_data', message: 'Produtos não encontrado' } });
  res.status(200).json({ products: produtos });
};

const produtoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const produto = await findById(id);

    if (!produto) return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });

    res.status(200).json(produto);
  } catch (_e) {
    return res.status(500).json({ err: { code: 'invalid_data', message: 'Requisição mal sucedida'} });
  }
};

module.exports = {
  cadastroProduto,
  produtoPorId,
  listaDeProdutos,
};

const { cadastro, findAll, findById } = require('../models/productsModels');


const cadastroProduto = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const cad = await cadastro({ name, quantity });

    return res.status(200).json({ message: cad });
  } catch (_e) {
    res.status(500).json({ message: 'Erro inesperado' });
  }
};

const listaDeProdutos = async (_req, res) => {
  const produtos = await findAll();

  if(!produtos) return res.status(404).json({ message: 'Produtos não encontrado' });
  res.status(200).json(produtos);
};

const produtoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const produto = await findById(id);

    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });

    res.status(200).json(produto);
  } catch {
    return res.status(500).json({ message: 'Requisição mal sucedida'});
  }
}

module.exports = {
  cadastroProduto,
  produtoPorId,
  listaDeProdutos
};

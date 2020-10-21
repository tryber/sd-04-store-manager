const { cadastro } = require('../models/productsModels');

const cadastroProduto = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const cad = await cadastro({ name, quantity });

    return res.status(200).json({ message: cad });
  } catch (_e) {
    res.status(500).json({ message: 'Erro inesperado' });
  }
};

module.exports = {
  cadastroProduto,
};

const dataStore = require('../models/dataModel');

const cadastraProduto = async (req, res) => {
  const { name, quantity } = req.body;

  if (name.length <= 5) {
    res.status(422).json({ message: 'Nome do produto deve ter 5 caracteres no minimo' });
  }

  await dataStore.cadastraProduto({ name, quantity });
};

module.exports = {
  cadastraProduto,
};

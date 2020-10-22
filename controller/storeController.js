const dataStore = require('../models/dataModel');

const cadastraProduto = async (req, res) => {
  const { name, quantity } = req.body;

  const product = await dataStore.cadastraProduto(name, quantity);
  console.log(product);

  res.status(201).json(product);
};

module.exports = {
  cadastraProduto,
};

const dataStore = require('../models/dataModel');
const storeService = require('../service/storeService');

const cadastraProduto = async (req, res) => {
  const { name, quantity } = req.body;
  console.log(name);

  const nameProd = await dataStore.findByName({ name });

  if (name.length <= 5) {
    storeService.countProductSize(res);
  }
  if (quantity <= 0) {
    storeService.countMoreThenZero(res);
  }
  if (typeof quantity === 'string') {
    storeService.verifyString(res);
  }
  if (nameProd && nameProd.name === name) {
    storeService.verifyWithExist(res);
  }
  {
    const product = await dataStore.cadastraProduto(name, quantity);
    console.log(product);

    res.status(201).json(product);
  }
};

const listaProdutos = async (_, res) => {
  const listProd = await dataStore.listProducts();

  res.status(200).json({ products: listProd });
};

const listProdutosPorId = async (req, res) => {
  const { id } = req.params;
  const productById = await dataStore.findById(id);

  if (!productById) {
    storeService.verifyProductById(res);
  }

  res.status(200).json(productById);
};

module.exports = {
  cadastraProduto,
  listaProdutos,
  listProdutosPorId,
};

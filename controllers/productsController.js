const productsModel = require('../models/productsModel');
const indexModel = require('../models/indexModel');

const postProductsController = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await productsModel.addProduct(name, quantity);
    res.status(201).json(product);
  } catch (_e) {
    console.log(_e.message);
  }
};

const putProductsDetailsController = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;

    await productsModel.updateProduct(id, name, quantity);
    const product = await indexModel.getById(id, 'products');
    res.status(200).json(product);
  } catch (_e) {
    console.log(_e.message);
  }
};

const deleteProductsController = async (req, res) => {
  const { id } = req.params;
  const productToDelete = await indexModel.getById(id, 'products');
  const errorMessage = {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  };
  if (!productToDelete) return res.status(422).json(errorMessage);
  await indexModel.deleteProduct(id, 'products');
  res.status(200).json(productToDelete);
};

const getProductsController = async (req, res) => {
  const products = await productsModel.getAll();
  return res.json({ products });
};

const getProductsDetailsController = async (req, res) => {
  const { id } = req.params;
  const product = await indexModel.getById(id, 'products');
  const errorMessage = {
    err: {
      code: 'invalid_data',
      message: 'Wrong id format',
    },
  };
  if (!product) return res.status(422).json(errorMessage);

  return res.status(200).json(product);
};

module.exports = {
  postProductsController,
  putProductsDetailsController,
  deleteProductsController,
  getProductsController,
  getProductsDetailsController,
};

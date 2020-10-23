const express = require('express');

const productModel = require('../models/productModel');

const productValidator = require('../middlewares/productValidator');

const router = express.Router();

// busca todos os produtos

router.get('/', async (req, res) => {
  try {
    const products = await productModel.getAllProducts();

    return res.status(200).json(products);
  } catch (_err) {
    return res.status(500).json({ message: 'Erro inesperado' });
  }
});

// busca produto de acordo com id

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.getProductById(id);

    console.log('linha 29, getById,\nproduct: ', product);

    if (!product) {
      console.log('produto não encontrado');
      return res.status(422).json(productValidator.responseMessage('invalid_data', 'Wrong id format'));
    }

    return res.status(200).json({ product });
  } catch (_err) {
    return res.status(422).json(productValidator.responseMessage('invalid_data', 'Wrong id format'));
  }
});

// cria um produto

router.post(
  '/',
  productValidator.validateProductName,
  productValidator.isProductNameUnique,
  productValidator.validateProductQuantityisNumber,
  productValidator.validateProductQuantity,
  async (req, res) => {
    try {
      const { name, quantity } = req.body;

      const product = await productModel.addProduct(name, quantity);

      return res.status(201).json(product);
    } catch (_err) {
      return res.status(422).json(productValidator.responseMessage('invalid_data', 'Wrong id format'));
    }
  },
);

// atualiza um produto

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productModel.getProductById(id);

  if (!product) {
    return res
      .sendStatus(422)
      .json(productValidator.responseMessage('invalid_data', 'Wrong id format'));
  }

  await productModel.updateProduct(id, name, quantity);
  return res.status(201).json(product);
});

// deleta um produto

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const product = await productModel.getProductById(id);

  if (!product) {
    return res
      .status(422)
      .json(productValidator.responseMessage('invalid_data', 'Wrong id format'));
  }
  await productModel.removeProduct(id);
  return res.status(201).json(product);
});

module.exports = router;

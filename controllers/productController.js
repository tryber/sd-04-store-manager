const express = require('express');

const productModel = require('../models/productModel');

const productValidator = require('../middlewares/productValidator');

const router = express.Router();

const responseMessage = (code, message) => ({ error: { message, code } });

// busca todos os produtos

router.get('/', async (req, res) => {
  try {
    const products = await productModel.getAllProducts();

    res.status(200).json(products);
  } catch (_err) {
    res.status(500).json({ message: 'Erro inesperado' });
  }
});

// busca produto de acordo com id

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.getProductById(id);

    console.log('linha 31, controller,\nproduct: ', product);

    if (!product) {
      return res.status(404).json(responseMessage('not_found', 'Wrong id format'));
    }

    return res.status(200).json({ product });
  } catch (_err) {
    return res.status(500).json({ message: 'Erro inesperado' });
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
      res.status(201).json(product);
    } catch (_err) {
      res.status(500).json({ message: 'Fail to register product' });
    }
  },
);

// atualiza um produto

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productModel.getProductById(id);

  if (!product) {
    return res.sendStatus(404).json(responseMessage('not_found', 'Produto não encontrado'));
  }

  await productModel.updateProduct(id, name, quantity);
  return res.status(200).json(product);
});

// deleta um produto

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productModel.getProductById(id);

  if (!product) {
    return res.status(404).json(responseMessage('not_found', 'Produto não encontrado'));
  }
  await productModel.removeProduct(id);
  return res.status(200).json(product);
});

module.exports = router;

const express = require('express');

const productModel = require('../models/productModel');

const router = express.Router();

const buildResponse = (code, message) => ({ error: { message, code } });

router.get('/', async (req, res) => {
  try {
    const products = await productModel.getAllProducts();

    console.log('linha 11, controller, products', products);

    res.status(200).json(products);
  } catch (_err) {
    res.status(500).json({ message: 'Erro inesperado' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.getProductById(id);

    console.log('linha 25, controller, product: ', product);

    if (!product) {
      return res.status(404).json(buildResponse('not_found', 'Produto não encontrado'));
    }

    return res.status(200).json({ product });
  } catch (_err) {
    return res.status(500).json({ message: 'Erro inesperado' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;

    return productModel
      .addProduct(name, quantity)
      .then((product) => res.status(201).json({ product }))
      .catch(() => res.status(500).json({ message: 'Erro...' }));
  } catch (_err) {
    res.status(500).json({ message: 'Erro inesperado' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const product = await productModel.getProductById(id);

  if (!product) {
    return res.sendStatus(404).json(buildResponse('not_found', 'Produto não encontrado'));
  }

  await productModel.updateProduct(id, name, quantity);
  return res.status(200).json(product);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productModel.getProductById(id);

  if (!product) {
    return res.status(404).json(buildResponse('not_found', 'Produto não encontrado'));
  }
  await productModel.removeProduct(id);
  return res.status(200).json(product);
});

module.exports = router;

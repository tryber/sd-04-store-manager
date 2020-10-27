const express = require('express');
const { productErrorDealer } = require('../middlewares/errorDealer');
const productModel = require('../models/productModel');

const router = express.Router();

router.get('/', async (req, res) =>
  productModel
    .getAllProducts()
    .then((allProducts) => res.status(200).json({ products: allProducts })),
);

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productModel.getProductById(id);

  if (!product) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  res.status(200).json(product);
});

router.post('/', productErrorDealer, async (req, res) => {
  const { name, quantity } = req.body;
  const exists = await productModel.getProductByName(name);
  if (!exists) {
    const product = await productModel.addProduct(name, quantity);

    res.status(201).json(product);
  } else {
    res.status(422).json({ err: { code: 'invalid_data', message: 'Product already exists' } });
  }
});

router.put('/:id', productErrorDealer, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  await productModel.updateProduct(id, name, quantity);
  const product = await productModel.getProductById(id);

  res.status(200).json(product);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await productModel.getProductById(id);
    await productModel.removeProduct(id);
    res.status(200).json(product);
  } catch (_e) {
    console.log(_e.message);
    res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
});

module.exports = router;

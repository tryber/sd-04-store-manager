const express = require('express');
const checkProduct = require('../helper/productSchema');
const productModel = require('../models/productModel');

const router = express.Router();

router.get('/', async (req, res) => {
  const allProducts = await productModel.getAllProducts();
  res.status(200).json({ products: allProducts });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productModel.getProductById(id);

  if (!product) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  res.status(200).json(product);
});

router.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;
    await checkProduct(req.body);

    const exists = await productModel.getProductByName(name);
    if (!exists) {
      const product = await productModel.addProduct(name, quantity);

      res.status(201).json(product);
    } else {
      res.status(422).json({ err: { code: 'invalid_data', message: 'Product already exists' } });
    }
  } catch (er) {
    console.log('erros', er);
    res.status(422).json({ err: { code: 'invalid_data', message: er.details[0].message } });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    await checkProduct(req.body);

    await productModel.updateProduct(id, name, quantity);

    const product = await productModel.getProductById(id);

    res.status(200).json(product);
  } catch (er) {
    console.log('erros', er);
    res.status(422).json({ err: { code: 'invalid_data', message: er.details[0].message } });
  }
});

module.exports = router;

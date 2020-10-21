const express = require('express');

const productModel = require('../models/productModel');

const router = express.Router();

router.get('/products', async (req, res) => {
  const products = await productModel.getAllProducts();
  res.status(200).json({ products });
});

router.get('/products/:id', async (req, res) => {
  const product = await productModel.getProductById(req.params.id);
  res.status(200).json({ product });
});

router.post('', async (req, res) => {
  productModel
    .addProduct()
    .then((product) => res.status(200).json({ message: product }))
    .catch(() => res.status(500).json({ message: 'Erro...' }));
});

module.exports = router;

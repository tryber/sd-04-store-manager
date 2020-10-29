const express = require('express');
const router = express.Router();
const { productModel } = require('../models');
const { validateProduct } = require('../service/validation');

router.post('/', validateProduct , async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await productModel.addProduct(name, quantity);
    
    res.status(200).json(product);
  } catch (_e) {
    console.log(_e);
    res.status(501).json({ message: 'Falha ao cadastrar o produto!' });
  }
});

router.get('/', async (req, res) => {
  try {
    const productsList = await productModel.listProducts();

    res.status(200).json(productsList);
  } catch (_e) {
    console.log(_e);
    res.status(501).json({ message: 'Falha ao carregar os produtos!' });
  }
});

module.exports = router;

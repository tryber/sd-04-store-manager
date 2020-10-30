const express = require('express');
const { productModel } = require('../models');
const { validateProduct } = require('../service/validation');

const router = express.Router();

router.post('/', validateProduct, async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const product = await productModel.addProduct(name, quantity);

    res.status(201).json(product);
  } catch (_e) {
    console.log(_e);
    res.status(501).json({ message: 'Falha ao cadastrar o produto!' });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await productModel.listProducts();

    res.status(200).json({ products });
  } catch (_e) {
    console.log(_e);
    res.status(501).json({ message: 'Falha ao carregar os produtos!' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findProductById(id);

    if (!product) {
      return res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }

    res.status(200).json(product);
  } catch (_e) {
    console.log(_e);
    res.status(501).json({ message: 'Falha ao carregar o produto!' });
  }
});

router.put('/:id', validateProduct, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const update = await productModel.updateProduct(id, name, quantity);

    if (!update) {
      return res.status(422).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }
    const updatedProduct = await productModel.findProductById(id);

    res.status(200).json(updatedProduct);
  } catch (_e) {
    console.log(_e);
    res.status(501).json({ message: 'Falha ao carregar o produto!' });
  }
});

module.exports = router;

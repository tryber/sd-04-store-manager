const express = require('express');

const router = express.Router();

const productModel = require('../models/productModel');

const productValidator = require('../middlewares/productValidator');

// busca todos os produtos

router.get('/', async (req, res) => {
  try {
    const products = await productModel.getAllProducts();

    if (!products) {
      return res
        .status(422)
        .json(productValidator.responseMessage('invalid_data', 'Wrong id format'));
    }

    return res.status(200).json({ products });
  } catch (_err) {
    return res
      .status(422)
      .json(productValidator.responseMessage('invalid_data', 'Wrong id format'));
  }
});

// busca produto de acordo com id

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productModel.getProductById(id);

    if (!product) {
      return res
        .status(422)
        .json(productValidator.responseMessage('invalid_data', 'Wrong id format'));
    }

    return res.status(200).json(product);
  } catch (_err) {
    return res
      .status(422)
      .json(productValidator.responseMessage('invalid_data', 'Wrong id format'));
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
      return res
        .status(422)
        .json(productValidator.responseMessage('invalid_data', 'Wrong id format'));
    }
  },
);

// atualiza um produto

router.put(
  '/:id',
  productValidator.validateProductName,
  productValidator.validateProductQuantity,
  productValidator.validateProductQuantityisNumber,
  async (req, res) => {
    const { id } = req.params;
    const { name, quantity } = req.body;

    const product = await productModel.getProductById(id);

    if (!product) {
      return res
        .sendStatus(422)
        .json(productValidator.responseMessage('invalid_data', 'Wrong id format'));
    }

    const newProduct = {};
    newProduct.name = name;
    newProduct.quantity = quantity;

    await productModel.updateProduct(id, name, quantity);

    return res.status(200).json(newProduct);
  },
);

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
  return res.status(200).json(product);
});

module.exports = router;

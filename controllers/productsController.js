const express = require('express');

const router = express.Router();
const productsService = require('../services/productsService');

const {
  getAll,
  findById,
  insertProduct,
  updateProduct,
  deleteOne,
} = require('../models/dbModel');

router.get('/', async (req, res) => {
  const products = await getAll('products');
  try {
    res.status(200);
    res.json({ products });
  } catch (err) {
    console.error(err);
    throw res.status(500);
  }
});

router.post(
  '/',
  productsService.productValidationMiddleware,
  productsService.nameValidationMiddleware,
  productsService.quantityValidationMiddleware,
  async (req, res) => {
    const { name, quantity } = req.body;
    try {
      const productAdded = await insertProduct(name, quantity);
      return res.status(201).json(productAdded);
    } catch (err) {
      console.error(err);
      throw res.status(500);
    }
  },
);

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await findById(id, 'products');
  try {
    if (!product) {
      res.status(422);
      return res.json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }
    res.status(200);
    return res.json(product);
  } catch (err) {
    console.error(err);
    throw res.status(500);
  }
});

router.put(
  '/:id',
  productsService.nameValidationMiddleware,
  productsService.quantityValidationMiddleware,
  async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;
    try {
      const productUpdated = await updateProduct(id, name, quantity);
      return res.status(200).json(productUpdated);
    } catch (err) {
      console.error(err);
      throw res.status(500);
    }
  },
);

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const product = findById(id, 'products');
  try {
    const productDeleted = await deleteOne(id, 'products');
    if (!product || !productDeleted) {
      res.status(422);
      return res.json({
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      });
    }

    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    throw res.status(500);
  }
});

module.exports = router;

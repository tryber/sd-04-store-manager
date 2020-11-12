const productsService = require('../services/productsService');

const express = require('express');
const {
  getAllProducts,
  findById,
  insertProduct,
  updateProduct,
  deleteProduct,
} = require('../models/productsModel');

const router = express.Router();
router.get('/', async (req, res) => {
  const products = await getAllProducts('products');
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
    const productDeleted = await deleteProduct(id, 'products');
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
// const products = async (req, res) => {
//   // const allProducts = await productsModel.getAllProducts();
//   res.status(201).send({});
// };

module.exports = router;

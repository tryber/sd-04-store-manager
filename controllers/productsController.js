const productsService = require('../services/productsService');

const express = require('express');
const { getAllProducts, findById } = require('../models/productsModel');

const router = express.Router();
router.get('/', async (req, res) => {
  const products = await getAllProducts();
  try {
    res.status(200);
    res.json({ products });
  } catch (err) {
    console.error(err);
    throw res.status(500);
  }
});

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const productAdded = await productsService.create(name, quantity);
    console.log(productAdded);
    if (productAdded.err) {
      return res.status(422).json(productAdded);
    }
    return res.status(201).json(productAdded);
  } catch (err) {
    console.error(err);
    throw res.status(500);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await findById(id);
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
// const products = async (req, res) => {
//   // const allProducts = await productsModel.getAllProducts();
//   res.status(201).send({});
// };

module.exports = router;

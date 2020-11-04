const router = require('express').Router();
const rescue = require('express-rescue');

const { createProduct } = require('../services/productsService');

router.post('/', async (req, res) => {
  const { name, quantity } = req.body;

  const product = await createProduct(name, quantity);
  const { err, error } = product;

  if (error) return res.status(422).json({ err });

  return res.status(201).json(product);
});

module.exports = router;

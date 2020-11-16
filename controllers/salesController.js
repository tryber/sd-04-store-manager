const express = require('express');
const saleService = require('../services/salesService');

const router = express.Router();

router.post('/', async (req, res) => {
  const item = req.body;
  const sale = await saleService.createSale(item);

  if (sale.error) return res.status(422).json({ err: sale.err });
  return res.status(200).json(sale);
});

// router.post('/', async (req, res) => {
//   const { name, quantity } = req.body;
//   const product = await ProductsServices.createProduct(name, quantity);

//   if (product.error) return res.status(422).json({ err: product.err });
//   return res.status(201).json(product);
// });

module.exports = router;

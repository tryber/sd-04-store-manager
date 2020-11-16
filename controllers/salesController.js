const express = require('express');
const saleService = require('../services/salesService');

const router = express.Router();

router.get('/', async (req, res) => {
  const sale = await saleService.getAll();
  res.status(200).json(sale);
});

router.post('/', async (req, res) => {
  const data = req.body;
  const result = await saleService.createSale(data);

  if (result.status) return res.status(result.status).json({ err: result.err });
  res.status(200).json(result);
});

// const productsRouter = Router();

// const listProducts = async (_req, res) => {
//   const products = await saleService.listSales();
//   res.status(200).json(products);
// };

// const newProduct = async (req, res) => {
//   try {
//     const { name, quantity } = req.body;
//     const result = await saleService.addSale(name, quantity);
//     if (result.error) return res.status(422).json({ err: result.err });
//     return res.status(201).json(result);
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// router.post('/', async (req, res) => {
//   const { data } = req.body;
//   const sale = await saleService.addSale(data);

//   if (sale.error) return res.status(422).json({ err: sale.err });
//   return res.status(201).json(sale);
// });

// productsRouter
//   .route('/')
//   .get(listProducts)
//   .post(newProduct);

module.exports = router;

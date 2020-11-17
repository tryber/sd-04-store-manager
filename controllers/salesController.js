const express = require('express');
const saleService = require('../services/salesService');

const router = express.Router();

router.post('/', async (req, res) => {
  const item = req.body;
  const sale = await saleService.createSale(item);

  if (sale.error) return res.status(422).json({ err: sale.err });
  return res.status(200).json(sale);
});

router.get('/', async (req, res) => {
  const sale = await saleService.getAll();
  res.status(200).json(sale);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await saleService.getById(id);

  if (sale.error) return res.status(404).json({ err: sale.err });
  res.status(200).json(sale);
});
// ------------------------------------------------------------------------------------
//  req 7

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const saleUpdate = req.body;
  console.log(req.body);
  const sale = await saleService.updateSale(id, saleUpdate);

  if (sale.error) return res.status(422).json({ err: sale.err });
  return res.status(200).json(sale);
});

// aqui acaba o req 7
// --------------------------------------------------------------------------------------

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;
//   const product = await ProductsServices.deleteProduct(id);

//   if (product.error) return res.status(422).json({ err: product.err });
//   res.status(200).json(product);
// });

module.exports = router;

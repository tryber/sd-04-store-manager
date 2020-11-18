const express = require('express');
const rescue = require('express-rescue');
const salesModel = require('../models/salesModel');
const productsModel = require('../models/productsModel');
const salesValidation = require('../middlewares/salesValidation');
const buildResponse = require('../middlewares/buildResponse');

const router = express.Router();

router.post('/', salesValidation.saleQuantityValidation, rescue(async (req, res) => {
  const [{ productId, quantity }] = req.body;
  const productQuantity = await productsModel.findById(productId);

  if (productQuantity.quantity < quantity)
    res.status(404).json(buildResponse('stock_problem', 'Such amount is not permitted to sell'))
  
    if (quantity === productQuantity.quantity)
    await productsModel.deleteProduct(productId);

  const sale = req.body
  const registerSale = await salesModel.addSale(sale);

  return res.status(200).json(registerSale); 
}));

router.get('/', rescue(async (req,res) => {
  const sales = await salesModel.findAllSales();

  res.status(200).json(sales);
}));

router.get('/:id', rescue(async (req,res) => {
  const { id } = req.params;
  const sale = await salesModel.findSaleById(id);

  res.status(200).json(sale);
}));

router.put('/:id', salesValidation.saleQuantityValidation, rescue(async (req, res) => {
  const { id } = req.params;
  const registeredSale = await salesModel.findSaleById(id);

  if (!registeredSale) {
    return res.status(422).json(buildResponse('invalid_data', 'Wrong id format'));
  }

  const saleReqBody = req.body;
  await salesModel.updateSale(id, saleReqBody);

  const sale = await salesModel.findSaleById(id);

  return res.status(200).json(sale);
}));

router.delete('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const deletedSale = await salesModel.findSaleById(id);

  if (!deletedSale)
    res.status(422).json(buildResponse('invalid_data', 'Wrong sale ID format'));

  await salesModel.deleteSale(id);

  return res.status(200).json(deletedSale);
}));

module.exports = router;

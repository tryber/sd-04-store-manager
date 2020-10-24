const salesModel = require('../models/salesModel');
const productService = require('../service/productService');

const registerSaleController = async (req, res) => {
  const filteredValue = req.body.filter(
    (value) => value.quantity <= 0 || typeof value.quantity === 'string',
  );

  if (filteredValue.length !== 0) {
    productService.wrongIdFormat(res);
  }

  const obj = await salesModel.registerSale(req.body);
  res.status(200).json(obj);
};

const listSalesController = async (req, res) => {
  const listSales = await salesModel.listSales();

  res.status(200).json({ sales: listSales });
};

const listSaleByID = async (req, res) => {
  const { id } = req.params;
  const listedSale = await salesModel.listSaleById(id);
  if (listedSale === 'erro') {
    res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }

  res.status(200).json({ listedSale });
};

module.exports = {
  registerSaleController,
  listSalesController,
  listSaleByID,
};

const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');
const productService = require('../service/productService');

const succesCode = 200;

const registerSaleController = async (req, res) => {
  const filteredValue = req.body.filter(
    (value) => value.quantity <= 0 || typeof value.quantity === 'string',
  );

  if (filteredValue.length !== 0) productService.wrongIdFormat(res);

  const obj = await salesModel.registerSale(req.body);
  const { productId, quantity } = obj.itensSold[0];
  const result = await productModel.findById(productId);
  const qtdOldProduct = result.quantity;

  if (result) {
    if (quantity < qtdOldProduct) {
      const newQty = qtdOldProduct - quantity;
      await productModel.updateProduct(productId, result.name, newQty);
    } else {
      productService.stockProblem(res);
    }
  }
  res.status(succesCode).json(obj);
};

const listSalesController = async (_, res) => {
  const listSales = await salesModel.listSales();
  res.status(succesCode).json({ sales: listSales });
};

const listSaleByID = async (req, res) => {
  const { id } = req.params;
  const listedSale = await salesModel.listSaleById(id);
  console.log(listedSale);
  if (listedSale === 'erro' || listedSale.length === 0) {
    res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }

  res.status(succesCode).json({ listedSale });
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];

  if (quantity <= 0 || typeof quantity === 'string') {
    productService.wrongIdFormat(res);
  }

  await salesModel.updateSaleModel(id, productId, quantity);
  const saleById = await salesModel.listSaleById(id);

  res.status(succesCode).json(saleById[0]);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const saleById = await salesModel.listSaleById(id);

  if (saleById === 'erro' || saleById.length === 0) {
    productService.wrongSaleId(res);
  }

  const { productId, quantity } = saleById[0].itensSold[0];

  await salesModel.deleteModel(id);
  const result = await productModel.findById(productId);
  const newQty = result.quantity + quantity;

  await productModel.updateProduct(productId, result.name, newQty);

  res.status(succesCode).json(saleById[0]);
};

module.exports = {
  registerSaleController,
  listSalesController,
  listSaleByID,
  updateSale,
  deleteSale,
};

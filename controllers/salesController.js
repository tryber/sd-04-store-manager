const salesModel = require('../models/salesModel');

const create = async (req, res) => {
  const itens = {
    itensSold: req.body,
  };
  const sales = await salesModel.addSales('sales', itens);
  res.status(200).json(sales);
};

const getAll = async (req, res) => {
  const allGet = await salesModel.getAllSales('sales');
  res.status(200).json({ sales: allGet });
};

const getByIdSales = async (req, res) => {
  const sale = await salesModel.findByIdSales('sales', req.params.id);
  res.status(200).json(sale);
};

const updateSales = async (req, res) => {
  const { productId, quantity } = req.body[0];
  await salesModel.update('sales', req.params.id, { productId, quantity });
  const sale = await salesModel.findByIdSales('sales', req.params.id);
  res.status(200).json(sale);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;
  const sale = await salesModel.findByIdSales('sales', id);
  await salesModel.deleteSale('sales', id);
  return res.status(200).json(sale);
};

module.exports = { create, getAll, getByIdSales, updateSales, deleteSales };

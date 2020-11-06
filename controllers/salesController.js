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

module.exports = { create, getAll, getByIdSales };

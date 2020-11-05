const salesModel = require('../models/salesModel');

const create = async (req, res) => {
  const itens = {
    itensSold: req.body,
  };
  const sales = await salesModel.addSales('sales', itens);
  console.log(sales);
  res.status(200).json(sales);
};

module.exports = { create };

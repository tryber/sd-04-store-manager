const SalesModel = require('../models/salesModel');

const listSales = async (req, res) => {
  const sale = await SalesModel.getAll();

  res.status(200).jsaon(sale);
};

module.exports = listSales;

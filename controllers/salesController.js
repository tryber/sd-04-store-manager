const rescue = require('express-rescue');
const Boom = require('@hapi/boom');
const { newSale, isValidSale, updateSales } = require('../services/salesService');
const salesService = require('../services/salesService');

const addNewSale = rescue(async (req, res, next) => {
  try {
    if (!isValidSale(req.body)) {
      next(Boom.badData('Wrong product ID or invalid quantity', 'invalid_data'));
    }
    const sale = await newSale(req.body);
    return res.status(200).json(sale);
  } catch (err) {
    next(err);
  }
});

const listSales = async (_req, res) => {
  const sales = await salesService.getAllSales();
  res.status(200).json(sales);
};

const getSalesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getSalesById(id);
    if (!sale) {
      return res.status(404).json({
        err: { code: 'not_found', message: 'Sale not found' },
      });
    }
    return res.status(200).json(sale);
  } catch (err) {
    next(err);
  }
};

const updateSale = async (req, res, next) => {
  try {
    if (!isValidSale(req.body)) {
      next(Boom.badData('Wrong product ID or invalid quantity', 'invalid_data'));
    } else {
      const { id } = req.params;
      const sale = await updateSales(id, req.body);
      res.status(200).json(sale);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addNewSale,
  listSales,
  getSalesById,
  updateSale,
};

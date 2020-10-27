const validator = require('validator');
const salesModel = require('../models/salesModel');

const add = async (items) => {
  const error = items.some((item) => (!validator.isInt(item.quantity.toString(), { min: 1 })));
  if (error) return 'Wrong product ID or invalid quantity';

  const newSales = await salesModel.add(items);
  return newSales;
};

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

module.exports = {
  add,
  getAllSales,
};

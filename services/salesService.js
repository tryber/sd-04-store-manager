const validator = require('validator');
const salesModel = require('../models/salesModel');

const add = async (items) => {
  const error = items.some((item) => (!validator.isInt(item.quantity.toString(), { min: 1 })));
  if (error) return 'Wrong product ID or invalid quantity';

  const newSales = await salesModel.add(items);
  return newSales;
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

module.exports = {
  add,
  getAll,
};

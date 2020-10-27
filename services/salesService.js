const validator = require('validator');
const salesModel = require('../models/salesModel');

const validation = (items) => items.some((item) => !validator.isInt(
  item.quantity.toString(), { min: 1 },
));

const add = async (items) => {
  if (validation(items)) return 'Wrong product ID or invalid quantity';

  const newSales = await salesModel.add(items);
  return newSales;
};

const del = async (id) => {
  const deletedSales = await salesModel.del(id);
  return deletedSales;
};

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  return sale;
};

const update = async (id, items) => {
  if (validation(items)) return 'Wrong product ID or invalid quantity';

  const updatedSales = await salesModel.update(id, items);
  return updatedSales;
};

module.exports = {
  add,
  del,
  getAllSales,
  update,
  getById,
};

const salesModel = require('../models/salesModel');

const createSales = async (req, res) => {
  const newSales = await salesModel.create(req.body);

  res.status(200).json(newSales);
};

module.exports = {
  createSales,
};

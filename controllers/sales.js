const salesModel = require('../model/sales');

const createSale = async ({ body }, res) => {
  const sales = body;
  salesModel.create(sales).then((result) => res.status(201).json(result));
};

module.exports = { createSale };

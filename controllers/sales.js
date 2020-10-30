const salesModel = require('../model/sales');

const createSale = async ({ body }, res) => {
  const sales = body;
  salesModel.create(sales).then((result) => res.status(200).json(result.ops[0]));
};

module.exports = { createSale };

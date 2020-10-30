const salesModel = require('../model/sales');

const createSale = async (req, res) => {
  const sales = req.body;
  salesModel
    .create(sales)
    .then((result) => res.status(201).json(result))
    .catch(() => res.status(422).send({ err: { message: 'Error', code: 'invalid_data' } }));
};

module.exports = { createSale };

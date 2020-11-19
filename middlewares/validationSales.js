const salesModel = require('../model/salesModel');

// verifica se a quantidade é menor que zero ou diferente de numero
const quantityProduct = async (req, res, next) => {
  const { quantity } = req.body[0];
  if (quantity <= 0 || typeof quantity !== 'number') { // typeof quantity !== 'number'
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  next();
};

//  lista todas as vendas
const showSales = async (req, res, next) => {
  const listSales = await salesModel.listAllSales();
  if (!listSales) {
    return res.status(422).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
  next();
};

module.exports = { quantityProduct, showSales };

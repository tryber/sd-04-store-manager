const salesModel = require('../model/salesModel');
const productModel = require('../model/productsModel');

// verifica se a quantidade é menor que zero ou diferente de numero
const quantityProduct = async (req, res, next) => {
  const { quantity } = req.body[0];
  if (quantity <= 0 || typeof quantity !== 'number') {
    // typeof quantity !== 'number'
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  } else if (quantity < 0) {
    return res.status(404).json({
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
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

// verifica se a venda foi deletada com sucesso
const verifyDeleteSale = async (req, res, next) => {
  const { id } = req.params;
  const product = await salesModel.getSaleById(id);
  if (!product) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
  next();
};

const updateQuatity = async (req, res, next) => {
  const [...itensSold] = req.body;

  itensSold.map(async ({ productId, quantity }) => {
    const product = await productModel.getProductById(productId);
    if (product.quantity < quantity) {
      return res.status(404).json({
        err: {
          code: 'stock_problem',
          message: 'Such amount is not permitted to sell',
        },
      });
    }

    productModel.updateProduct(productId, quantity, true);
  });

  next();
};

module.exports = { quantityProduct, showSales, verifyDeleteSale, updateQuatity };

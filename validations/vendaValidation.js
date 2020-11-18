const { produtoModel } = require('../models');

const validaQty = async ({ pId, quantity }) => {
  const product = await produtoModel.findProdutoById(pId);

  if (product[0].quantity - quantity <= 0) return 404;

  if (typeof quantity === 'string' || quantity <= 0) return 422;

  return true;
};

const validaVenda = async (sales) => {
  const valida = await Promise.all(sales.map(validaQty));

  if (valida.includes(422)) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }

  if (valida.includes(404)) {
    return {
      err: {
        code: 'stock_problem',
        message: 'Such amount is not permitted to sell',
      },
    };
  }

  return true;
};

module.exports = {
  validaVenda,
};

const productsModel = require('../models/productsModel');

const errHandler = (status) => {
  if (status === 422) {
    return {
      status: 422,
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
    };
  }
  if (status === 404) {
    return {
      status: 404,
      err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
    };
  }
  return false;
};

const saleValid = async (data) =>
  Promise.all(
    data.map(async ({ productId, quantity }) => {
      const findProduct = await productsModel.findById(productId);
      if (quantity < 1 || typeof quantity !== 'number' || !findProduct) {
        return 422;
      }
      if (quantity >= findProduct.quantity) {
        return 404;
      }
      return false;
    }),
  );

const validadeSale = async (data) => {
  const error = await saleValid(data);
  if (error.includes(404)) return errHandler(404);
  if (error.includes(422)) return errHandler(422);
  return {};
};

module.exports = { validadeSale };

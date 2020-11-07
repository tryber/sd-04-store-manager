const { errorsMessages } = require('./errors');
const { productModels } = require('../models');

const validationQuantity = async (req, res, next) => {
  try {
    const data = req.body;

    const notValid = await data.every(
      (item) => item.quantity <= 0 || Number.isNaN(Number(item.quantity)),
    );

    if (notValid) {
      return errorsMessages(res, 'Wrong product ID or invalid quantity', 'invalid_data');
    }
    return next();
  } catch (err) {
    console.error('validationQuantity', err);
  }
};

const validationProd = async (req, res, next) => {
  try {
    const data = req.body;

    const valid = await data.every(async (item) => {
      const product = await productModels.getProdById(item.productId);
      return product;
    });

    if (valid) {
      return next();
    }
    return errorsMessages(res, 'Wrong product ID or invalid quantity', 'invalid_data');
  } catch (err) {
    console.error('validationQuantity', err);
  }
};

module.exports = { validationQuantity, validationProd };

const { HTTPStatus } = require('../config');
const { productModels } = require('../models');

const resgisterValid = async (req, res, next) => {
  const { name, quantity } = req.body;
  const existOrNotProduct = await productModels.getProdByName(name);

  if (!Number.isNaN(Number(name)) || name.length < 5) {
    return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  if (quantity <= 0) {
    return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  if (Number.isNaN(Number(quantity))) {
    return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  if (existOrNotProduct) {
    return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  next();
};

module.exports = resgisterValid;

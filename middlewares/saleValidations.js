const returnResponse = require('../services/returnResponse');

const validateQuantity = (req, res, next) => {
  const { body } = req;

  for (let i = 0; i < body.length; i += 1) {
    if (body[i].quantity <= 0 || !Number.isInteger(body[i].quantity)) {
      return res
        .status(422)
        .json(returnResponse('invalid_data', 'Wrong product ID or invalid quantity'));
    }
  }

  next();
};

module.exports = {
  validateQuantity,
};

const { buildResponse } = require('./buildResponse');

const saleQuantityValidation = async (req, res, next) => {
  const [...itensSold] = req.body;
  console.log(req.body);

  itensSold.forEach((item) => {
    if (item.quantity < 0 || item.quantity === 0 || !Number.isInteger(item.quantity)) {
      return res.status(422).json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
    }
  });
  next();
};

module.exports = {
  saleQuantityValidation,
};

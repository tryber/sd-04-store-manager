const { buildResponse } = require('./buildResponse');

const saleQuantityValidation = async (req, res, next) => {
  const [...itensSold] = req.body;
  let isError = false;

  itensSold.forEach((item) => {
    if (item.quantity <= 0 || isNaN(item.quantity)) {
      isError = true;
    }
  });

  if (isError) { 
    return res.status(422).json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
  };

  next();
};

module.exports = {
  saleQuantityValidation,
};

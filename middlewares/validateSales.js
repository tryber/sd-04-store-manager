const invalidData = (message) => ({ err: { code: 'invalid_data', status: 422, message } });

// const isNumber = (item) => /^[0-9]+$/.test(item);

const validateSaleQuant = async (req, res, next) => {
  const [...itensSold] = req.body;

  itensSold.forEach((item) => {
    if (item.quantity < 0 || item.quantity === 0) {
      return res.status(422).json(invalidData('Wrong product ID or invalid quantity'));
    }
  });

  next();
};

const validateSaleNumber = async (req, res, next) => {
  const [...itensSold] = req.body;

  itensSold.forEach((item) => {
    if (!Number.isInteger(item.quantity)) {
      return res.status(422).json(invalidData('Wrong product ID or invalid quantity'));
    }
  });

  next();
};

module.exports = { validateSaleQuant, validateSaleNumber };

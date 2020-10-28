const invalidData = (message) => ({ err: { code: 'invalid_data', status: 422, message } });

const validateSaleQuant = async (req, res, next) => {
  const [...itensSold] = req.body;

  const mapItem = itensSold.map((item) => item.quantity);

  if (mapItem.some((item) => item < 0 || item === 0)) {
    return res.status(422).json(invalidData('Wrong product ID or invalid quantity'));
  }

  next();
};

const validateSaleNumber = async (req, res, next) => {
  const [...itensSold] = req.body;

  const mapItem = itensSold.map((item) => item.quantity);

  if (mapItem.some((item) => !Number(item))) {
    return res.status(422).json(invalidData('Wrong product ID or invalid quantity'));
  }

  next();
};

module.exports = { validateSaleQuant, validateSaleNumber };

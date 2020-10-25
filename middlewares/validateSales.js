const invalidData = (message) => ({ err: { code: 'invalid_data', status: 422, message } });
// const notFound = (message) => ({ err: { code: 'not_found', status: 404, message } });
// const stockProblem = (message) => ({ err: { code: 'stock_problem', status: 404, message } });

const isNumber = (item) => /^[0-9]+$/.test(item);

const validateSale = async (req, res, next) => {
  const [...itensSold] = req.body;

  itensSold.forEach((item) => {
    if (item.quantity < 0 || item.quantity === 0) {
      return res.status(422).json(invalidData('Wrong product ID or invalid quantity'));
    }
  });

  itensSold.forEach((item) => {
    if (!isNumber(item.quantity)) {
      return res.status(422).json(invalidData('Wrong product ID or invalid quantity'));
    }
  });

  return next();
};

module.exports = { validateSale };

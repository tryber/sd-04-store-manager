const { checkProduct } = require('../helper/productSchema');

const errorDealer = async (req, res, next) => {
  try {
    await checkProduct(req.body);
    next();
  } catch (er) {
    res.status(422).json({ err: { code: 'invalid_data', message: er.details[0].message } });
  }
};

module.exports = errorDealer;

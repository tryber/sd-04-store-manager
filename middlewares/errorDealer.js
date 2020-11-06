const { productSchema, saleSchema } = require('../schema/schema');

const checkProduct = async (item) => productSchema.validate(item);

const checkSale = async (item) => saleSchema.validate(item);

const productErrorDealer = async (req, res, next) => {
  try {
    await checkProduct(req.body);
    next();
  } catch (er) {
    res.status(422).json({ err: { code: 'invalid_data', message: er.details[0].message } });
  }
};

const saleErrorDealer = async (req, res, next) => {
  try {
    await checkSale(req.body);
    next();
  } catch (er) {
    res
      .status(422)
      .json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
  }
};

module.exports = { productErrorDealer, saleErrorDealer };

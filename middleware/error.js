const Validation = require('../service/validations');

const authProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  const response = await Validation.isProductValid(name, quantity);

  if (response) {
    return res.status(response.status).json(response.error);
  }

  console.log('Middleware Produto OK NEXT');
  next();
};

module.exports = {
  authProduct,
};

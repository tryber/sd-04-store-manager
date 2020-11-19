// const buildResponse = validationProducts.buildResponse;

// verifica se a quantidade é menor que zero ou diferente de numero
const quantityProduct = async (req, res, next) => {
  const { quantity } = req.body[0];
  if (quantity <= 0 || !Number.isInteger(quantity)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  next();
};

module.exports = { quantityProduct };

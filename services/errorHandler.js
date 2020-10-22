const errorMessages = {
  minLength: '"name" length must be at least 5 characters long',
  quantityMin: '"quantity" must be larger than or equal to 1',
  quantityType: '"quantity" must be a number',
};

const boomMsg = (error) => errorMessages[`${error.data[0].path}${error.data[0].reason}`];

const errorHandler = (error, _req, res, next) => {
  if (error.code === 11000) {
    return res
      .status(422)
      .json({ err: { code: 'invalid_data', message: 'Product already exists' } });
  }
  if (error.isBoom) {
    return res.status(error.output.statusCode).json({
      err: { code: 'invalid_data', message: boomMsg(error) || error.output.payload.message },
    });
  }
  next(error);
};

module.exports = {
  errorHandler,
};

const errorMessages = {
  nameminLength: '"name" length must be at least 5 characters long',
  quantityminimum: '"quantity" must be larger than or equal to 1',
  quantitytype: '"quantity" must be a number',
};

const boomReformat = (error) => errorMessages[`${error.data[0].path}${error.data[0].reason}`];

const errorHandler = (error, _req, res, next) => {
  if (error.isBoom) {
    return res.status(error.output.statusCode).json({
      err: { code: 'invalid_data', message: boomReformat(error) || error.output.payload.message },
    });
  }
  next(error);
};

module.exports = {
  errorHandler,
};

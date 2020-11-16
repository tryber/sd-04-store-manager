const isQuantityValid = (req, res, next) => {
  const { body } = req;
  let isValid = next();
  body.filter((item) => {
    if (item.quantity <= 0 || !Number.isInteger(item.quantity)) {
      isValid = res.status(422).json({
        err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
      });
    }
    return isValid;
  });
};

module.exports = {
  isQuantityValid,
};

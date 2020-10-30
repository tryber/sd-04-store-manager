const buildResponse = (code, message) => ({ err: { code, message } });

// quantity
const validateQuantityIsMoreThanZero = (req, res, next) => {
  req.body.forEach((element) => {
    if (element.quantity <= 0) {
      return res
        .status(422)
        .json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
    }

    if (element.quantity <= 0) {
      return res
        .status(422)
        .json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
    }
  });

  next();
};

const validateQuantityIsNumber = (req, res, next) => {
  req.body.forEach((element) => {
    // console.log('element: ', element);
    // console.log('element.quantity: ', element.quantity);
    if (!Number.isInteger(element.quantity)) {
      return res.status(422).json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
    }
  });
  // console.log('MSG: ', msg);

  next();
};

module.exports = {
  validateQuantityIsMoreThanZero,
  validateQuantityIsNumber,
};

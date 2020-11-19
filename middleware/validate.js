const buildResponse = (code, message) => ({ err: { code, message } });

const nameLongerThan5 = (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return res
      .status(422)
      .json(buildResponse('invalid_data', '"name" length must be at least 5 characters long'));
  }

  next();
};

const quantityIsNot0OrLess = (req, res, next) => {
  const { quantity } = req.body;

  if (quantity < 1) {
    return res
      .status(422)
      .json(buildResponse('invalid_data', '"quantity" must be larger than or equal to 1'));
  }

  next();
};

const quantityIsNumber = (req, res, next) => {
  const { quantity } = req.body;

  if (!Number.isInteger(quantity)) {
    console.log(quantity);
    return res.status(422).json(buildResponse('invalid_data', '"quantity" must be a number'));
  }

  next();
};

const salesQuantityIsNot0OrLess = (req, res, next) => {
  const [...itensSold] = req.body;
  const quantities = itensSold.map(({ quantity }) => quantity);

  if (quantities.some((item) => item <= 0)) {
    return res
      .status(422)
      .json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
  }

  next();
};

const salesQuantityIsNumber = (req, res, next) => {
  const [...itensSold] = req.body;
  const quantities = itensSold.map(({ quantity }) => quantity);

  if (quantities.some((item) => isNaN(item))) {
    return res
      .status(422)
      .json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
  }

  next();
};

const salesProductIdAndQuantity = (req, res, next) => {
  const { body } = req;
  for (let i = 0; i < body.length; i += 1) {
    if (body[i].quantity < 1 || !Number.isInteger(body[i].quantity)) {
      return res
        .status(422)
        .json(buildResponse('invalid_data', 'Wrong product ID or invalid quantity'));
    }
  }
  next();
};

module.exports = {
  nameLongerThan5,
  quantityIsNot0OrLess,
  quantityIsNumber,
  salesQuantityIsNot0OrLess,
  salesQuantityIsNumber,
  salesProductIdAndQuantity,
};

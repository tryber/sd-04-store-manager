/**
 * Validation middleware made based on express-validator module documentation and
 * this dev.top article https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go
 */
const { body, validationResult } = require('express-validator');
const Joi = require('joi');

/**
 * User data validation rules
 */
const productsDataRules = () => [
  // Product name must be at last 6 characters long
  body('name', '"name" length must be at least 5 characters long').exists().isLength({ min: 6 }),
  // The quantity must be a integer
  body('quantity', '"quantity" must be a number')
    .exists()
    .isInt()
    .custom((quantity) => {
      if (quantity > 0) {
        return true;
      }
      throw new Error('"quantity" must be larger than or equal to 1');
    }),
];

/**
 * Do data validation using given data validation rules on the route*
 */
const validateData = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) return next();

  const normalizedErrors = errors.array().map((error) => error.msg);

  return res.status('422').send({ err: { message: normalizedErrors[0], code: 'invalid_data' } });
};

const schema = Joi.array().items(
  Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
  }).unknown(false),
);

const validateSale = (req, res, next) => {
  // console.log(sales);
  const { error } = schema.validate(req.body, { convert: false });

  if (error) {
    return res
      .status(422)
      .send({ err: { message: 'Wrong product ID or invalid quantity', code: 'invalid_data' } });
  }

  next();
};

module.exports = {
  productsDataRules,
  validateData,
  validateSale,
};

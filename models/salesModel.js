const Joi = require('joi');

const schema = Joi.array().items(
  Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required(),
  }).unknown(false),
);

const validateSale = (sale) => {
  const { error } = schema.validate(sale, { convert: false });
  if (error) return 'Wrong product ID or invalid quantity';
};

module.exports = { validateSale };

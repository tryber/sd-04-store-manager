const { Joi } = require('frisby');

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const saleSchema = Joi.array().items(
  Joi.object({
    productId: Joi.string().min(5).required(),
    quantity: Joi.number().integer().min(1).required(),
  }),
);

module.exports = {
  productSchema,
  saleSchema,
};

const Joi = require('@hapi/joi');
const salesModel = require('../models/salesModel');

const schemaSales = Joi.object({
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Wrong product ID or invalid quantity',
    'number.min': 'Wrong product ID or invalid quantity',
    'number.empty': 'Wrong product ID or invalid quantity',
    'any.required': 'Wrong product ID or invalid quantity',
  }),
});

// Válida o tamanho (length) dos campos name e quantity utilizando o hapi
const validate_Quantity_Length = (req, res, next) => {
  for (const items of req.body) {
    // console.log(items.quantity);
    const quantity = items.quantity;
    const isErro = schemaSales.validate({ quantity });
    if (isErro.error) {
      return res.status(422).json({ err: { code: 'invalid_data', message: isErro.error.message } });
    }
  }

  next();
};

// Válida se o campo quantity é número
const validate_Quantity_Type = (req, res, next) => {
  for (const items of req.body) {
    // console.log(items.quantity);
    if (!Number.isInteger(items.quantity)) {
      return res
        .status(422)
        .json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
    }
  }

  next();
};

// Válida se o produto (name) já existe no bancoo
const validateProductExisteByName = async (req, res, next) => {
  const { productId } = req.body;

  const productSales = await salesModel.findByName(productId);

  if (productSales) {
    return res.status(404).json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }

  next();
};

// Válida o Id
const validateExistId = async (req, res, next) => {
  // Obtên o id do produto
  const salesId = await salesModel.findById(req.params.id);

  // Retonar mensagem de erro caso o id do produto não é válido
  if (!salesId) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }
  // Passa o produto para a próxima middleware
  req.sales = salesId;

  next();
};

module.exports = {
  validate_Quantity_Length,
  validate_Quantity_Type,
  validateProductExisteByName,
  validateExistId,
};

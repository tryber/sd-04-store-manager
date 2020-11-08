const Joi = require('@hapi/joi');
const utilsModel = require('../service/model');

const schemaSales = Joi.object().keys({
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': 'Wrong product ID or invalid quantity',
    'number.min': 'Wrong product ID or invalid quantity',
    'number.empty': 'Wrong product ID or invalid quantity',
    'any.required': 'Wrong product ID or invalid quantity',
  }),
});

// Válida o tamanho (length) dos campos name e quantity utilizando o hapi
const validateQuantityLength = async (req, res, next) => {
  let quantity = {};
  req.body.forEach((items) => {
    quantity = items.quantity;
    console.log(quantity);
    const isErro = schemaSales.validate({ quantity });
    if (isErro.error) {
      return res.status(422).json({ err: { code: 'invalid_data', message: isErro.error.message } });
    }
  });

  next();
};

// Válida se o campo quantity é número
const validateQuantityType = async (req, res, next) => {
  req.body.forEach((items) => {
    // console.log(items.quantity);
    if (!Number.isInteger(items.quantity)) {
      return res
        .status(422)
        .json({ err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
    }
  });

  next();
};

// Válida o Id
const validateExistId = async (req, res, next) => {
  // Obtên o id do produto
  const salesId = await utilsModel.findById(req.params.id, 'sales');

  // Retonar mensagem de erro caso o id do produto não é válido
  if (!salesId) {
    if (req.method !== 'GET') {
      return res
        .status(422)
        .json({ err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
    }
    return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
  // Passa o produto para a próxima middleware
  req.sales = salesId;

  next();
};

module.exports = {
  validateQuantityLength,
  validateQuantityType,
  validateExistId,
};

const Joi = require('@hapi/joi');
const producModel = require('../models/productModel');
const utilsModel = require('../utils/model');

const schemaProduct = Joi.object().keys({
  name: Joi.string()
    .trim()
    .min(5)
    .required()
    .messages({
      'string.base': '"name" length must be at least 5 characters long',
      'string.min': '"name" length must be at least 5 characters long',
      'string.empty': '"name" length must be at least 5 characters long',
      'any.required': '"name" length must be at least 5 characters long',
    }),
  quantity: Joi.number().integer().min(1).required().messages({
    'number.base': '"quantity" must be larger than or equal to 1',
  }),
});

// Válida o tamanho (length) dos campos name e quantity utilizando o hapi
const validateNameQuantityLength = async (req, res, next) => {
  const { name, quantity } = req.body;
  // console.log(name, quantity);
  const isErro = schemaProduct.validate({ name, quantity });
  if (isErro.error) {
    // console.log('teste1');
    return res.status(422).json({ err: { code: 'invalid_data', message: isErro.error.message } });
  }

  next();
};

// Válida se o campo quantity é número
const validateQuantityType = async (req, res, next) => {
  const { quantity } = req.body;

  if (!Number.isInteger(quantity)) {
    // console.log('teste2');
    return res
      .status(422)
      .json({ err: { code: 'invalid_data', message: '"quantity" must be a number' } });
  }

  next();
};

// Válida se o produto (name) já existe no bancoo
const validateProductExisteByName = async (req, res, next) => {
  const { name } = req.body;
  
  const productName = await producModel.findByName(name);
  if (productName) {    
    return res
      .status(422)
      .json({ err: { code: 'invalid_data', message: 'Product already exists' } });
  }

  next();
};

// Válida o Id
const validateExistId = async (req, res, next) => {
  // Obtên o id do produto
  const productId = await utilsModel.findById(req.params.id, 'products');

  // Retonar mensagem de erro caso o id do produto não é válido
  if (!productId) {
    //  console.log('teste4');
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  // Passa o produto para a próxima middleware
  req.products = productId;

  next();
};

module.exports = {
  validateNameQuantityLength,
  validateQuantityType,
  validateProductExisteByName,
  validateExistId,
};

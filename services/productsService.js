const { validate } = require('@expresso/validator');
const productsModel = require('../models/productsModel');

const productsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 5,
    },
    quantity: {
      type: 'integer',
      minimum: 0,
    },
  },
  additionalProperties: false,
  required: ['name', 'quantity'],
};

const validateProduct = validate(productsSchema);

const getAll = () => productsModel.getAll();

const newProduct = async (name, quantity) => {
  const product = await productsModel.newProduct(name, quantity);
  return { _id: product.insertedId, name, quantity };
};

module.exports = {
  getAll,
  newProduct,
  validateProduct,
};

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
      minimum: 1,
    },
  },
  additionalProperties: false,
  required: ['name', 'quantity'],
};

const validateProduct = validate(productsSchema);

const getAll = () => productsModel.getAll();

const errorMsg = (code, message) => ({ err: { code, message } });

const newProduct = async (name, quantity) => {
  const existProduct = await productsModel.getProductByName(name);
  if (existProduct) return errorMsg('invalid_data', 'Product already exists');

  const product = await productsModel.newProduct(name, quantity);
  return { _id: product.insertedId, name, quantity };
};

module.exports = {
  getAll,
  newProduct,
  validateProduct,
};

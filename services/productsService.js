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

const validateId = (id) => id && id.length === 24;

const getAll = async () => ({ products: await productsModel.getAll() });

const getProductById = (id) => productsModel.getProductById(id);

const errorMsg = (code, message) => ({ err: { code, message } });

const newProduct = async (name, quantity) => {
  const existProduct = await productsModel.getProductByName(name);
  if (existProduct) return errorMsg('invalid_data', 'Product already exists');

  const product = await productsModel.newProduct(name, quantity);
  return { _id: product.insertedId, name, quantity };
};

const updateProduct = async (id, name, quantity) => {
  await productsModel.updateProduct(id, name, quantity);
  return { _id: id, name, quantity };
};

module.exports = {
  getAll,
  newProduct,
  validateProduct,
  getProductById,
  validateId,
  updateProduct,
};

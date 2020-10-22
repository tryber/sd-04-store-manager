const { productModels } = require('../models');
const { HTTPStatus } = require('../config');
const { errors } = require('../service');

const registerProdController = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const registerProd = await productModels.registerProduct(name, quantity);

    return res.status(HTTPStatus.CREATED).json(registerProd);
  } catch (_err) {
    return errors.errorIntern(res);
  }
};

const getAllProdController = async (_req, res) => {
  try {
    const products = await productModels.getAllProducts();

    return res.status(HTTPStatus.OK).json({ products });
  } catch (_err) {
    return errors.errorIntern(res);
  }
};

const getProdByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModels.getProdById(id);
    if (product === null) {
      return errors.errorUnprocessableEntity(res, 'Wrong id format');
    }
    return res.status(HTTPStatus.OK).json(product);
  } catch (_err) {
    return errors.errorIntern(res);
  }
};

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    await productModels.updateProduct(id, name, quantity);

    const productUpdated = await productModels.getProdById(id);

    console.log('productUpdated', productUpdated);

    return res.status(HTTPStatus.OK).json(productUpdated);
  } catch (_err) {
    return errors.errorIntern(res);
  }
};

module.exports = {
  getAllProdController,
  registerProdController,
  getProdByIdController,
  updateProductController,
};

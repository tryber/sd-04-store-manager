const { productModels } = require('../models');
const { HTTPStatus } = require('../config');
const { errors } = require('../service');

const registerProdController = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const registerProd = await productModels.registerProduct(name, quantity);

    return res.status(HTTPStatus.CREATED).json(registerProd);
  } catch (err) {
    console.error('registerProdController', err);
    return errors.errorsMessages(res);
  }
};

const getAllProdController = async (_req, res) => {
  try {
    const products = await productModels.getAllProducts();

    return res.status(HTTPStatus.OK).json({ products });
  } catch (err) {
    console.error('getAllProdController', err);
    return errors.errorsMessages(res);
  }
};

const getProdByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModels.getProdById(id);

    if (product.err) {
      return errors.errorsMessages(res, 'Wrong id format', 'invalid_data');
    }

    return res.status(HTTPStatus.OK).json(product);
  } catch (err) {
    console.error('getProdByIdController', err);
    return errors.errorsMessages(res);
  }
};

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    await productModels.updateProduct(id, name, quantity);

    const productUpdated = await productModels.getProdById(id);

    return res.status(HTTPStatus.OK).json(productUpdated);
  } catch (err) {
    console.error('updateProductController', err);
    return errors.errorsMessages(res);
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProd = await productModels.getProdById(id);

    if (!deleteProd) {
      return errors.errorsMessages(res, 'Wrong id format', 'invalid_data');
    }

    await productModels.deleteProduct(id);
    return res.status(HTTPStatus.OK).json(deleteProd);
  } catch (err) {
    console.error('deleteProductController', err);
    return errors.errorsMessages(res);
  }
};

module.exports = {
  getAllProdController,
  registerProdController,
  getProdByIdController,
  updateProductController,
  deleteProductController,
};

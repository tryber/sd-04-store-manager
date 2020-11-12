const { productModel } = require('../models');
const { errors } = require('../services');

const createProdController = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const registerProd = await productModel.createProduct(name, quantity);
    // console.log(registerProd);
    return res.status(201).json(registerProd);
  } catch (err) {
    console.error('createProdController', err);
    return errors.errorsMessages(res);
  }
};

const getAllProdController = async (_req, res) => {
  try {
    const products = await productModel.getAllProducts();

    return res.status(200).json({ products });
  } catch (err) {
    console.error('getAllProdController', err);
    return errors.errorsMessages(res);
  }
};

const getProdByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log('id', id);
    const product = await productModel.getProdById(id);
    // console.log('products', product);
    if (product == null) {
      return errors.errorsMessages(res, 'Wrong id format', 'invalid_data');
    }

    return res.status(200).json(product);
  } catch (err) {
    console.error('getProdByIdController', err);
    return errors.errorsMessages(res);
  }
};

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;

    await productModel.updateProduct(id, name, quantity);

    const productUpdated = await productModel.getProdById(id);

    return res.status(200).json(productUpdated);
  } catch (err) {
    console.error('updateProductController', err);
    return errors.errorsMessages(res);
  }
};

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProd = await productModel.getProdById(id);

    if (!deleteProd) {
      return errors.errorsMessages(res, 'Wrong id format', 'invalid_data');
    }

    await productModel.deleteProduct(id);
    return res.status(200).json(deleteProd);
  } catch (err) {
    console.error('deleteProductController', err);
    return errors.errorsMessages(res);
  }
};

module.exports = {
  createProdController,
  getAllProdController,
  getProdByIdController,
  updateProductController,
  deleteProductController,
};

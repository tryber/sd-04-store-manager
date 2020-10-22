const { productModels } = require('../models');
const { HTTPStatus } = require('../config');
const { errors } = require('../service');

const registerProdController = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const registerProd = await productModels.registerProduct(name, quantity);

    console.log('registerProd', registerProd);
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

const getProdByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log('idCont', id);
    const product = await productModels.getProdById(id);
    if (product === null) {
      return next(errors.errorUnprocessableEntity(res, 'Wrong id format'));
    }
    // console.log('product', product);
    return res.status(HTTPStatus.OK).json(product);
  } catch (_err) {
    return next(errors.errorUnprocessableEntity(res, 'Wrong id format'));
  }
};

module.exports = { getAllProdController, registerProdController, getProdByIdController };

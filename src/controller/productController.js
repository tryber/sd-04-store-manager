const { productModels } = require('../models');
const { HTTPStatus } = require('../config');
const { errors } = require('../service');

const registerProdController = async (req, res) => {
  try {
    const data = req.body;
    const registerProd = await productModels.registerProduct(data);

    return res.status(HTTPStatus.CREATED).json(registerProd);
  } catch (_err) {
    return errors.errorIntern(res);
  }
};

const getAllProdController = async (_req, res) => {
  try {
    const allProducts = await productModels.getAllProducts();
    if (!allProducts) {
      return errors.errorUnprocessableEntity(res, 'Produto não encontrado');
    }
    return res.status(HTTPStatus.OK).json(allProducts);
  } catch (_err) {
    return errors.errorIntern(res);
  }
};

module.exports = { getAllProdController, registerProdController };

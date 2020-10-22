const { productModels } = require('../models');
const { HTTPStatus } = require('../config');

const registerProdController = async (req, res) => {
  try {
    const data = req.body;
    const registerProd = await productModels.registerProduct(data);

    return res.status(HTTPStatus.CREATED).json(registerProd);
  } catch (_err) {
    return res
      .status(HTTPStatus.INTERN_ERROR)
      .json({ error: { message: 'Erro Interno', code: HTTPStatus.INTERN_ERROR } });
  }
};

const getAllProdController = async (_req, res) => {
  try {
    const allProducts = await productModels.getAllProducts();
    if (!allProducts) {
      return res
        .status(HTTPStatus.UNPROCESSABLE_ENTITY)
        .json({ message: 'Produto não encontrado' });
    }
    return res.status(HTTPStatus.OK).json(allProducts);
  } catch (_err) {
    return res
      .status(HTTPStatus.INTERN_ERROR)
      .json({ error: { message: 'Erro Interno', code: HTTPStatus.INTERN_ERROR } });
  }
};

module.exports = { getAllProdController, registerProdController };

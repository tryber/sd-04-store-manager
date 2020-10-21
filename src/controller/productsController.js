const productModels = require('../models/productModels');
const { HTTPStatus } = require('../config');

const getAllProdController = async (_req, res) => {
  try {
    const allProducts = await productModels.getAllProducts();
    if (!allProducts) {
      return res.status(HTTPStatus.NOT_FOUND.code).json({ message: 'allProducts não encontrado' });
    }
    res.status(HTTPStatus.OK).json(allProducts);
  } catch (err) {
    console.log(err);
    res
      .status(HTTPStatus.INTERN_ERROR)
      .json({ error: { message: 'Erro Interno', code: HTTPStatus.INTERN_ERROR } });
  }
};

module.exports = { getAllProdController };

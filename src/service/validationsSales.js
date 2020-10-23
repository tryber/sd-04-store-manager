const { errorUnprocessableEntity } = require('./errors');
const { productModels } = require('../models');

const validationQuantity = async (req, res, next) => {
  const data = req.body;

  /*
  verifico cada um dos meus objetos dentro de data, seja 1 ou mais;
  com o reduce consigo saber se um ou ambos deram erro,
  assim se um dar erro eu salvo no array inicialmente vazio
  */
  const valid = await data.reduce(async (acc, item) => {
    const product = await productModels.getProdById(item.productId);
    if (!product || item.quantity <= 0 || Number.isNaN(Number(item.quantity))) {
      acc.push(item);
    }
    return acc;
  }, []);

  if (valid.length === 0) {
    // se não tenho tamanho no array nenhum deu erro
    return next();
  }
  return errorUnprocessableEntity(res, 'Wrong product ID or invalid quantity');
};

module.exports = { validationQuantity };

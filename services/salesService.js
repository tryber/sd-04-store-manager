const salesModel = require('../model/salesModel');
const validaSales = require('../validate/salesValidate');
const producTModel = require('../model/productModel');

const adicionar = async (itensSold) => {
  const validaSale = {
    code: 'invalid_data',
    message: '',
  };

  const result = itensSold.map(async ({ productId, quantity }) => {
    const validaId = validaSales.validaExist(productId);
    const validaQuantidade = validaSales.validaQuantidade(quantity);
    const produto = await producTModel.getById(productId);

    if (validaQuantidade.message !== '') {
      return Promise.reject(new Error('Wrong product ID or invalid quantity'));
    }
    if (produto.quantity < quantity) {
      validaSale.code = 'stock_problem';
      validaSale.message = 'Such amount is not permitted to sell';
    }
    producTModel.updateProdSales(productId, quantity, true);

    return validaId;
  });

  await Promise.all(result).catch((err) => {
    validaSale.message = err.message;
  });

  if (validaSale.message === '') {
    return salesModel.adicionar(itensSold);
  }
  return validaSale;
};

const update = async (id, itensSold) => {
  itensSold.forEach(({ quantity }) => {
    const validaQuantidade = validaSales.validaQuantidade(quantity);

    if (validaQuantidade.message !== '') throw new Error();
  });

  await salesModel.update(id, itensSold);
  return salesModel.getById(id);
};

module.exports = {
  update,
  adicionar,
};

const salesModel = require('../model/salesModel');
const validaSales = require('../validate/salesValidate');

const adicionar = async (itensSold) => {
  const validaSale = {
    code: 'invalid_data',
    message: '',
  }

const result = itensSold.map(({ productId, quantity }) => {
  const validaId = validaSales.validaExist(productId);
  const validaQuantidade = validaSales.validaQuantidade(quantity);
  
  if (validaQuantidade.message !== '') {
    return Promise.reject( new Error ('Wrong product ID or invalid quantity'));
  }
  return validaId;
  });

  await Promise.all(result).catch((err) => validaSale.message = err.message);
  

  if (validaSale.message === '') {
    return salesModel.adicionar(itensSold);
  }
  return validaSale;
};

module.exports = {
  adicionar,
};

const productModel = require('../model/productModel');
const ProductModel = require('../model/productModel');
const validaProduct = require('../validate/productValidate');

const add = async (name, quantidade) => {
  const validaNome = await validaProduct.validaNome(name);
  const validaQuantidade = validaProduct.validaQuantidade(quantidade);

  if (validaNome.message === '' && validaQuantidade.message === '') {
    const produto = await ProductModel.add(name, quantidade);

    return produto;
  } else if (validaNome.message !== '') return validaNome;
  return validaQuantidade;

  // if (result.code === 'invalid_data') return res.status(422).json({ err: result });
};

const update = async (id, name, quantidade) => {
  const validaNome = await validaProduct.validaNome(name, id);
  const validaQuantidade = validaProduct.validaQuantidade(quantidade);

  if (validaNome.message === '' && validaQuantidade.message === '') {
    await ProductModel.update(id, name, quantidade);
    const result = productModel.getById(id);

    return result;
  } else if (validaNome.message !== '') return validaNome;
  return validaQuantidade;
};

const getById = async (id) => {
  const { VALIDA_PRODUCT, produto } = await validaProduct.validaExist(id);

  if (VALIDA_PRODUCT.message === '') return produto;
  return VALIDA_PRODUCT;
};

module.exports = {
  getById,
  add,
  update,
};

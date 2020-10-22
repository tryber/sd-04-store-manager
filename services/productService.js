const Product = require('../model/productModel');
const validaProduct = require('../validate/productValidate');

const add = async (name, quantidade) => {
  const validaNome = await validaProduct.validaNome(name);
  const validaQuantidade = validaProduct.validaQuantidade(quantidade);
  console.log("Produto service",validaQuantidade);

  const produto = await Product.add(name, quantidade);

  return produto;
}

module.exports = {
  add,
}
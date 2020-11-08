const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');
const util = require('./model');

const verifySale = async (qtdSales, qtdProduct) => {
  // Verifica se a qtd da venda é maior a do estoque
  if (qtdSales > qtdProduct) return false;
  // Verifica se a venda gera um numero negativo
  const total = Number(qtdProduct - qtdSales);

  if (total < 0) return false;
  // Retorna o valor atual do campo (qtd)
  return total;
};

const update = async (id, obj) => {
  // const salesId = await req.body;
  const [{ productId, ...qtdSales }] = obj;

  const product = await util.findById(productId, 'products');
  const { _id, name, ...qtdProduct } = product;

  const newQtd = await verifySale(qtdSales.quantity, qtdProduct.quantity);

  // console.log('total estoque', total);
  if (!newQtd) return false;

  // Atualiza a qtd da tabela sales
  function updateObj(obj) {
    obj.quantity = newQtd;
  }

  const result = await salesModel.update(id, obj);

  // const result = await salesModel.update(id, obj);
  return result;
};

const add = async (obj) => {
  // Cria o objeto (qtdAdd) que contém a qtd da venda - (Venda)
  const [{ productId, ...qtdAdd }] = obj;

  // Obtendo os dados do produto que terá seu valor (qtd) atualizado
  const product = await util.findById(productId, 'products');

  // Cria o objeto (qtdProduct)
  const { _id, name, ...qtdProduct } = product;
  // Valida a venda
  const newQtd = await verifySale(qtdAdd.quantity, qtdProduct.quantity);
  // Caso a venda não seja validada retorna false
  if (!newQtd) return false;

  // Caso a venda seja validada, atauliza a qtd do produto
  function updateObj(obj) {
    obj.quantity = newQtd;
  }

  // Adiciona a venda na tabela sales
  const sales = await salesModel.addSales(obj);
  // Atauliza a qtd de produos na tabela product
  await productModel.update(_id, name, newQtd);
  return sales;
};

module.exports = { update, add };

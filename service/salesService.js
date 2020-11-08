const salesModel = require('../models/salesModel');
const productModel = require('../models/productModel');
const util = require('./model');

const verifyResult = async (qtdSales, qtdProduct) => {
  if (qtdSales > qtdProduct) return false;
  return true;
};

const update = async (id, obj) => {
  // const salesId = await req.body;
  const [{ productId, ...qtdSales }] = obj;

  const product = await util.findById(productId, 'products');
  const { _id, name, ...qtdProduct } = product;

  const total = await verifyResult(qtdProduct.quantity, qtdSales.quantity);
  console.log('total add', total);
  // console.log('total estoque', total);
  if (!total) return false;

  await productModel.update(_id, name, qtdSales.quantity);
  const result = await salesModel.update(id, obj);
  return result;
};

const add = async (obj) => {
  const [{ productId, ...qtdAdd }] = obj;

  const product = await util.findById(productId, 'products');

  const { _id, name, ...qtdProduct } = product;
  const result = await verifyResult(qtdAdd.quantity, qtdProduct.quantity);

  if (!result) return false;

  // await productModel.update(_id, name, qtdAdd.quantity);
  const sales = await salesModel.addSales(obj);
  return sales;
};

module.exports = { update, add };

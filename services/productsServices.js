const { insertProdMod, getAllProdMod, validateNameMod } = require('../models/productsModel');

const invalidData = (message) => ({
  err: { err: true, code: 'invalid_data', status: 422, message },
});
const isNumber = (quantity) => /^[0-9]+$/.test(quantity);
// // const notFound = (message) => ({ error: true, code: 'not_found', status: 404, message });
// // const stockProblem = (message) => ({ error: true,code: 'stock_problem',status: 404,message });

const validateName = async (name) => {
  if (name.length < 5) {
    return invalidData('"name" length must be at least 5 characters long');
  }
  return false;
};

const validateQuantity = async (quantity) => {
  if (quantity <= 0) {
    return invalidData('"quantity" must be larger than or equal to 1');
  }
  return false;
};

const validateIsNumber = async (quantity) => {
  if (!isNumber(quantity)) {
    return invalidData('"quantity" must be a number');
  }
  return false;
};

const validateExistProd = async (name) => {
  const prodNameOk = await validateNameMod(name);
  if (prodNameOk) {
    return invalidData('Product already exists');
  }
};

const registerProdServ = async (name, quantity) => {
  const insertProd = await insertProdMod(name, quantity);
  return insertProd;
};

const listAllProdServ = async () => {
  const products = await getAllProdMod();
  return products;
};

module.exports = {
  registerProdServ,
  listAllProdServ,
  validateName,
  validateQuantity,
  validateIsNumber,
  validateExistProd,
};

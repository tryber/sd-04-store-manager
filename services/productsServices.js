const {
  insertProdMod,
  getAllProdMod,
  validateNameMod,
  getByIdProdMod,
} = require('../models/productsModel');

const invalidData = (message) => ({ err: { code: 'invalid_data', status: 422, message } });
// const notFound = (message) => ({ err: { code: 'not_found', status: 404, message } });
// const stockProblem = (message) => ({ err: { code: 'stock_problem', status: 404, message } });

const isNumber = (quantity) => /^[0-9]+$/.test(quantity);
const idRegex = (id) => /^[0-9a-fA-F]{24}$/.test(id);

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

// const validateID = (id) => {
//   const idRegex = /^[0-9a-fA-F]{24}$/.test(id);
//   if (!idRegex) return invalidData('Wrong id format');
//   return false;
// };

const registerProdServ = async (name, quantity) => {
  const insertProd = await insertProdMod(name, quantity);
  return insertProd;
};

const listAllProdServ = async () => {
  const products = await getAllProdMod();
  return products;
};

const listByIdProdServ = async (id) => {
  if (!idRegex(id)) {
    return invalidData('Wrong id format');
  }
  const productId = await getByIdProdMod(id);
  if (!productId) {
    return invalidData('Wrong id format');
  }
  return productId;
};

module.exports = {
  validateName,
  validateQuantity,
  validateIsNumber,
  validateExistProd,
  /*   validateID, */
  registerProdServ,
  listAllProdServ,
  listByIdProdServ,
};

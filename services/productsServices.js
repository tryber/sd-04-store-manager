const { validateNameMod, getByIdProdMod, deleteProdMod } = require('../models/productsModel');

const invalidData = (message) => ({ err: { code: 'invalid_data', status: 422, message } });
const isNumber = (quantity) => /^[0-9]+$/.test(quantity);

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

const listByIdProdServ = async (id) => {
  const productId = await getByIdProdMod(id);
  if (!productId) return invalidData('Wrong id format');
  return productId;
};

const deleteProdServ = async (id) => {
  const deleteProd = await deleteProdMod(id);
  if (!deleteProd) {
    return invalidData('Wrong id format');
  }
  return deleteProd;
};

module.exports = {
  validateName,
  validateQuantity,
  validateIsNumber,
  validateExistProd,
  listByIdProdServ,
  deleteProdServ,
};

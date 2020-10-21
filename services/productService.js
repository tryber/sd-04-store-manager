const Products = require('../models/Products');

const code = 'invalid_data';

const validateNameType = (name) => {
  if (typeof name !== 'string') {
    return false;
  }
  return true;
};

const validateNameLength = (name) => {
  if (name.length < 5) {
    return false;
  }
  return true;
};

const validateQuantity = (quantity) => {
  if (quantity <= 0 || String(quantity).includes('.')) {
    return false;
  }
  return true;
};

const validateQuantityType = (quantity) => {
  if (typeof quantity !== 'number') {
    return false;
  }
  return true;
};

const addAProduct = async (name, quantity) => {
  if (!validateNameLength(name)) return {
    err: {
      code,
      message: '"name" length must be at least 5 characters long',
    },
  };

  if (await Products.findByName(name) !== null) return {
    err: {
      code,
      message: 'Product already exists',
    },
  };

  if (!validateQuantity(quantity)) return {
    err: {
      code,
      message: '"quantity" must be larger than or equal to 1',
    },
  };

  if (!validateQuantityType(quantity)) return {
    err: {
      code,
      message: '"quantity" must be a number',
    },
  };

  return await Products.addProduct(name, quantity);;
};

module.exports = {
  addAProduct,
};

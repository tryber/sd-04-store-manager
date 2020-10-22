const productsModel = require('../model/productsModel');

const nameValidation = async (name) => {
  const product = await productsModel.findByName(name);
  if (name.length < 5) {
    return {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  } else if (product) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }
  return product;
};

const quantityValidation = async (quantity) => {
  if (quantity <= 0) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" length must be larger than or equal to 1',
      },
    };
  }
  if (typeof quantity === 'string') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }
  return null;
};

const create = async (name, quantity) => {
  const nameError = await nameValidation(name);
  const quantityError = await quantityValidation(quantity);
  if (nameError) {
    return nameError;
  }
  if (quantityError) {
    return quantityError;
  }
  // const allProducts = await productsModel.getAllProducts();
  const product = await productsModel.insertProduct(name, quantity);
  return product;
};

module.exports = { create };

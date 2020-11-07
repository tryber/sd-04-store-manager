const productsModel = require('../models/productsModel');

const nameValidation = async (name) => {
  const product = await productsModel.findByName(name);
  console.log(product);
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
  return null;
};

const quantityValidation = async (quantity) => {
  if (quantity <= 0) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  if (isNaN(quantity)) {
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

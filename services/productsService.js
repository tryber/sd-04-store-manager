const Products = require('../models/productsModel');

const code = 'invalid_data';

// validando se name é uma string
const validateNameType = (name) => {
  if (typeof name !== 'string') {
    return false;
  }
  return true;
};

// validando se name tem mais de 5 caracteres
const validateNameLength = (name) => {
  if (name.length < 5) {
    return false;
  }
  return true;
};

// validando se a quantidade é maior do que 0
const validateQuantity = (quantity) => {
  if (quantity <= 0) {
    return false;
  }
  return true;
};

// validando se a quantidade é um número
const validateQuantityType = (quantity) => {
  if (typeof quantity !== 'number') {
    return false;
  }
  return true;
};

const nameCheck = async (name, flag = false) => {
  if (!validateNameLength(name)) {
    return {
      err: {
        code,
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  if (flag && (await Products.findByName(name)) !== null) {
    return {
      err: {
        code,
        message: 'Product already exists',
      },
    };
  }
};

const quantityCheck = async (quantity) => {
  if (!validateQuantity(quantity)) {
    return {
      err: {
        code,
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }

  if (!validateQuantityType(quantity)) {
    return {
      err: {
        code,
        message: '"quantity" must be a number',
      },
    };
  }
};

// colocar essas funções em outro arquivo

const addingProduct = async (name, quantity) => {
  const nameValidation = await nameCheck(name, true);
  const quantityValidation = await quantityCheck(quantity);

  if (nameValidation) {
    return nameValidation;
  }

  if (quantityValidation) {
    return quantityValidation;
  }

  const addResultResponse = await Products.addProduct(name, quantity);

  return addResultResponse;
};

const updatingProduct = async (id, name, quantity) => {
  const nameValidation = await nameCheck(name);
  const quantityValidation = await quantityCheck(quantity);

  if (nameValidation) {
    return nameValidation;
  }

  if (quantityValidation) {
    return quantityValidation;
  }

  const updateResultResponse = await Products.updateValues(id, name, quantity);

  return updateResultResponse;
};

const wrongIdRes = () => ({
  err: {
    code,
    message: 'Wrong id format',
  },
});

const deletingProduct = async (id) => {
  const deletedProductResponse = await Products.deleteById(id);

  if (deletedProductResponse === null) {
    return wrongIdRes();
  }

  return deletedProductResponse;
};

const listingAllProducts = async () => Products.findAll();

const showingProductById = async (id) => {
  const productResult = await Products.findById(id);

  if (!productResult) {
    return wrongIdRes();
  }

  return productResult;
};

module.exports = {
  validateNameType,
  validateNameLength,
  addingProduct,
  updatingProduct,
  deletingProduct,
  listingAllProducts,
  showingProductById,
};

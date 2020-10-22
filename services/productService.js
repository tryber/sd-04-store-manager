const Products = require('../models/Products');

const code = 'invalid_data';

// const validateNameType = (name) => {
//   if (typeof name !== 'string') {
//     return false;
//   }
//   return true;
// };

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

const avaliateName = async (name) => {
  if (!validateNameLength(name)) {
    return {
      err: {
        code,
        message: '"name" length must be at least 5 characters long',
      },
    };
  }

  if (await Products.findByName(name) !== null) {
    return {
      err: {
        code,
        message: 'Product already exists',
      },
    };
  }
};

const avaliateQuantity = async (quantity) => {
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

const addAProduct = async (name, quantity) => {
  const nameValidation = await avaliateName(name);
  const quantityValidation = await avaliateQuantity(quantity);

  if (nameValidation) {
    return nameValidation;
  }

  if (quantityValidation) {
    return quantityValidation;
  }

  const addResultResponse = await Products.addProduct(name, quantity);

  return addResultResponse;
};

const listProducts = async () => Products.findAll();

const showASpecificProductById = async (id) => {
  const productResult = await Products.findById(id);
  console.log(productResult);
  if (!productResult) {
    return {
      err: {
        code,
        message: 'Wrong id format',
      },
    };
  }

  return productResult;
};

module.exports = {
  addAProduct,
  listProducts,
  showASpecificProductById,
};

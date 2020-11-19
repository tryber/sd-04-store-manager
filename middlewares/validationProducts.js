const productsModel = require('../model/productsModel');

// verifica se o name vem vazio
const verifyEmpetyName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'empety name',
      },
    });
  }
  next();
};

// verifica se o nome é menor que 5
const lengthNameVerify = (req, res, next) => {
  console.log('lengthNameVerify');
  const { name } = req.body;
  if (name.length < 5) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  next();
};

// verifica se produto já exite
const existNameOfProduct = async (req, res, next) => {
  console.log('existNameOfProduct');
  const { name } = req.body;
  const product = await productsModel.findByName(name);
  if (product) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  next();
};

// verifica se o nome está fazio
const validationNameProduct = (req, res, next) => {
  console.log('validationNameProduct');
  const { name } = req.body;
  if (!name) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'The name is empty, fill up!',
      },
    });
  }
  next();
};

// verifica se a quatidade é menor ou igual a 0
const quantityOfProduct = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity < 1 && quantity <= 0) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  next();
};

// verifica se quantidade não é um valor de string
const stringOfProduct = (req, res, next) => {
  console.log('stringOfProduct');
  const { quantity } = req.body;
  if (!Number.isInteger(quantity)) {
    res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  next();
};

// verifica se produto foi deletado com sucesso
const verifyDeleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await productsModel.getProductById(id);
  if (!product) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  next();
};

module.exports = {
  verifyEmpetyName,
  lengthNameVerify,
  validationNameProduct,
  existNameOfProduct,
  quantityOfProduct,
  stringOfProduct,
  verifyDeleteProduct,
};

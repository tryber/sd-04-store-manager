const productsModel = require('../models/productsModel');

const errors = {
  1: {
    err: {
      code: 'invalid_data',
      message: '\"name\" length must be at least 5 characters long',
    },
  },
  2: {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  },
  3: {
    err: {
      code: 'invalid_data',
      message: '\"quantity\" must be larger than or equal to 1',
    },
  },
  4: {
    err: {
      code: 'invalid_data',
      message: '\"quantity\" must be a number',
    },
  },
};

const createProductVal = async (req, res, next) => {
  const { name, quantity } = req.body;
  const product = await productsModel.get(name);

  if (name.length < 5) return res.status(422).json(errors[1]);
  if (product) return res.status(422).json(errors[2]);
  if (quantity <= 0) return res.status(422).json(errors[3]);
  if (!Number.isInteger(quantity)) return res.status(422).json(errors[4]);

  next();
};

module.exports = {
  createProductVal,
};

const productsModel = require('../models/producstModel');

const nameLength = (req, res, next) => {
  const { name } = req.body;
  if (!name || name.length < 5) {
    return res.status(422).send({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  return next();
};

const nameExists = async (req, res, next) => {
  const { name } = req.body;
  const findProduct = await productsModel.getByName(name);
  if (findProduct) {
    return res.status(422).send({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  return next();
};

const quantityLessThanZero = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity < 1) {
    return res.status(422).send({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  return next();
};

const quantityNotANumber = (req, res, next) => {
  const { quantity } = req.body;
  if (isNaN(quantity)) {
    return res.status(422).send({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  return next();
};

const add = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const addProduct = await productsModel.add(name, quantity);
    return res.status(201).json(addProduct);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  const updateProduct = await productsModel.update(id, name, quantity);
  if (updateProduct) {
    return res.status(200).json(updateProduct);
  }
  return res.status(422).send({
    err: {
      message: 'Produto não encontrado',
    },
  });
};

module.exports = {
  nameLength,
  nameExists,
  quantityLessThanZero,
  quantityNotANumber,
  add,
  update,
};

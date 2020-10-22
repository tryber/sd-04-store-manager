const productsModel = require('../models/producstModel');

const nameLength = (req, res, next) => {

  const { name } = req.body;

  

  if (!name || name.length < 5) {
    res.status(422).send({
      "err": {
        "code": "invalid_data",
        "message": "\"name\" length must be at least 5 characters long"
      }
    });
  }

  next();

};

const nameExists = async (req, res, next) => {

  const { name } = req.body;

  const findProduct = await productsModel.getByName(name);

  if (findProduct) {
    res.status(422).send({
      "err": {
        "code": "invalid_data",
        "message": "Product already exists"
      }
    });
  }

  next();

};

const quantityLessThanZero = (req, res, next) => {

  const { quantity } = req.body;

  if (quantity < 1) {
    res.status(422).send({
      "err": {
        "code": "invalid_data",
        "message": "\"quantity\" must be larger than or equal to 1"
      }
    });
  }

  next();

}

const quantityNotANumber = (req, res, next) => {

  const { quantity } = req.body;

  if (isNaN(quantity)) {
    res.status(422).send({
      "err": {
        "code": "invalid_data",
        "message": "\"quantity\" must be a number"
      }
    });
  }

  next();

}

const add = async (req, res) => {

  const { name, quantity } = req.body;

  try {
    const addProduct = await productsModel.add(name, quantity);

    res.status(201).json(addProduct);

  } catch (err) {

    res.status(500).send({ message: err });
  }

};

const getAll = async (req, res) => {
  const products = await productsModel.getAll();
  if (products) {
    res.status(200).json(products);
  }

  res.status(599).send({
    "err": {
      "msg": 'Deu ruim',
    }

  })

}

module.exports = {
  nameLength,
  nameExists,
  quantityLessThanZero,
  quantityNotANumber,
  add,
  getAll
}
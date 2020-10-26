const productsModel = require('../models/productsModel');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productsModel.create(name, quantity);

  res.status(201).json(newProduct);
}

module.exports = {
  createProduct,
};

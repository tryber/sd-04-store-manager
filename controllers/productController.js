const productModel = require('../models/productModel');

const showProducts = async (req, res) => {
  const product = await productModel.getAll();
  res.status(200).json(product);
};

const addProduct = async (req,res) => {
  const {name, quantity} = req.body;
  await productModel.addProduct(name, quantity);
  const product = await productModel.findByName('products',name);
  res.status(200).json(product);
}

module.exports = {showProducts, addProduct}
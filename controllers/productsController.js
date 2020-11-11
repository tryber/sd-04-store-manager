const ProductsModel = require('../models/productsModel');

const listProducts = async (req, res) => {
  const products = await ProductsModel.getAll();

  res.status(200).jsaon(products);
};

module.exports = listProducts;

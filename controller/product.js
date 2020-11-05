const Service = require('../service/product');

const postNewProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await Service.postNewProduct(name, quantity);
  return res.status(201).json(product);
};

const getAllProducts = async (_req, res) => {
  const products = await Service.getAllProducts();
  res.status(200).json({ products });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Service.getProductById(id);
  res.status(200).json(product);
};

const putProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await Service.putProduct(id, name, quantity);
  return res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Service.deleteProduct(id);
  return res.status(200).json(product);
};

module.exports = {
  getAllProducts,
  postNewProduct,
  getProductById,
  putProduct,
  deleteProduct,
};

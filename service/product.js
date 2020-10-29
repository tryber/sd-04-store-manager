const Model = require('../model/product');

const postNewProduct = async (name, quantity) => {
  const product = await Model.postNewProduct(name, quantity);
  return product;
};

const getAllProducts = async () => {
  const products = await Model.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  console.log('Id no service', id);
  const product = await Model.getProductById(id);
  return product;
};

const putProduct = async (id, name, quantity) => {
  const product = await Model.putProduct(id, name, quantity);
  return product;
};

const deleteProduct = async (id) => { await Model.deleteProduct(id); };

module.exports = {
  postNewProduct,
  getAllProducts,
  getProductById,
  putProduct,
  deleteProduct,
};

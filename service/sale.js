const saleModel = require('../model/sale');
// const productModel = require('../model/product');

const getAllSale = async () => {
  const sales = await saleModel.getAllSales();
  return sales;
};

const postNewSale = async (itenSold) => {
  const newSale = await saleModel.postNewSale(itenSold);
  return newSale;
};

const getSaleById = async (id) => {
  console.log('Id no service', id);
  const product = await saleModel.getSaleById(id);

  console.log('product bugado', product);
  return product;
};

const putSale = async (id, name, quantity) => {
  const sale = await saleModel.putSale(id, name, quantity);
  return sale;
};

const deleteSale = async (id) => {
  const deleted = await saleModel.getSaleById(id);

  console.log('Sale Vindo do Model antes de deletar', deleted);

  await saleModel.deleteSale(id);

  return deleted;
};

module.exports = {
  getAllSale,
  postNewSale,
  getSaleById,
  putSale,
  deleteSale,
};

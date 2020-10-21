const { insertProdMod, getAllProdMod } = require('../models/productsModel');

const registerProdServ = async (name, quantity) => {
  const insertProd = await insertProdMod(name, quantity);
  return insertProd;
};

const listAllProdServ = async () => {
  const products = await getAllProdMod();
  return products;
};

module.exports = {
  registerProdServ,
  listAllProdServ,
};

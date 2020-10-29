const salesModel = require('../models/salesModel');

const newSale = async (itensSold) => {
  const sale = await salesModel.newSale(itensSold);
  return { _id: sale.insertedId, itensSold };
};

const isValidSale = (itensSold) => {
  let isValid = true;
  itensSold.forEach(({ quantity }) => {
    if (quantity <= 0 || typeof quantity !== 'number') isValid = false;
  });
  return isValid;
};

const getAllSales = async () => ({ sales: await salesModel.getAllSales() });

const getSalesById = async (id) => salesModel.getSalesById(id);

const verifyId = (id) => getSalesById(id);

const updateSales = async (id, itensSold) => {
  await salesModel.updateSales(id, itensSold);
  return { _id: id, itensSold };
};

const deleteSales = (id) => salesModel.deleteSales(id);

module.exports = {
  newSale,
  isValidSale,
  getAllSales,
  getSalesById,
  verifyId,
  updateSales,
  deleteSales,
};

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

const getSale = async (id) => salesModel.getSalesById(id);

const verifyId = (id) => salesModel.getSalesById(id);

const saleUpd = async (id, itensSold) => {
  await salesModel.updateSales(id, itensSold);
  return { _id: id, itensSold };
};

const del = (id) => salesModel.deleteSales(id);

const similarBlocksCC = () => 'what??';

const similarBlocksCC2 = () => 'nothing to declare';

module.exports = {
  newSale,
  isValidSale,
  similarBlocksCC,
  getAllSales,
  similarBlocksCC2,
  getSale,
  verifyId,
  saleUpd,
  del,
};

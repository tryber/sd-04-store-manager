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

module.exports = {
  newSale,
  isValidSale,
};

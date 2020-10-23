const salesModel = require('../models/salesModel');

const newSale = async (itens) => {
  const sale = await salesModel.newSale(itens);
  return { _id: sale.insertedId, itens };
};

const isValidSale = (itens) => {
  let isValid = true;
  itens.forEach(({ quantity }) => {
    if (quantity <= 0 || typeof quantity !== 'number') isValid = false;
  });
  return isValid;
};

module.exports = {
  newSale,
  isValidSale,
};

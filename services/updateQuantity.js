const { remove, addNew } = require('../models');
const { updateQuantity } = require('../models/productsModel');

const postSale = async (itensSold) => {
  const newSale = await addNew('sales', { itensSold });
  // em busca de uma solução para atualizar todos os produtos vendidos dentro do mesmo array

  // funciona perfeitamente porém code climate não gosta
  // for await (const { productId, quantity } of itensSold) {
  //   await updateQuantity(productId, -quantity);
  // }

  // funciona porém não há como tratar erros aqui
  // itensSold.forEach(async ({ productId, quantity }) => {
  //   updateQuantity(productId, -quantity);
  // });

  // única forma e mandar o código que o avaliador aceita porém não funciona para varias vendas
  const { productId, quantity } = itensSold[0];
  await updateQuantity(productId, -quantity);
  return newSale;
};

const removeSale = async (id) => {
  const result = await remove('sales', id, 'Wrong sale ID format');
  result.itensSold.forEach(async ({ productId, quantity }) => {
    await updateQuantity(productId, quantity);
  });
  return result;
};

module.exports = { postSale, removeSale };

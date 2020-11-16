const salesModel = require('../models/salesModel');
const validadeSale = require('./salesValid');
const productsModel = require('../models/productsModel');

const getAll = async () => ({ sales: await salesModel.findAll() });

// const getAll = async () => {
//   const sales = await productsModel.findAll();
//   return { products };
// };

const createSale = async (data) => {
  try {
    const validation = await validadeSale(data);
    if (validation.status) return validation;
    await Promise.all(
      data.map(async ({ productId, quantity }) => {
        const stock = await productsModel.findById(productId);
        const newStock = stock.quantity - quantity;
        await productsModel.update(productId, stock.name, newStock);
      }),
    );
    const sales = await salesModel.add(data);
    return { _id: sales.insertedId, itensSold: data };
  } catch (e) {
    process.exit(1);
  }
};

// const createSale = async (data) => {
//   const validation = await validadeSale(data);
//   if (validation.status) return validation;

//   const sale = await salesModel.addSale(quantity);
//   return { _id: sale.insertedId };
// };

module.exports = { getAll, createSale };

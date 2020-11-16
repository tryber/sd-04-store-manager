const productsModel = require('../models/productsModels');
const salesModel = require('../models/salesModels');

const errors = {
  1: {
    err: {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    },
  },
};

const verifyQttInStock = (pdtsInStock, items) => {
  for (let i = 0, lenItems = items.length; i < lenItems; i += 1) {
    for (let j = 0, lenPdts = pdtsInStock.length; j < lenPdts; j += 1) {
      // CC não aceita _id vindo do mongo
      let { _id: pdtId } = pdtsInStock[j];
      pdtId = pdtId.toHexString();

      if (items[i].productId === pdtId && (pdtsInStock[j].quantity - items[i].quantity) < 0) {
        return false;
      }
    }
  }

  return true;
};

const updateQttInStock = (pdtsInStock, itemsSold, op) =>
  itemsSold.forEach((item) =>
    pdtsInStock.forEach((pdt) => {
      // CC não aceita _id vindo do mongo
      let { _id: pdtId } = pdt;
      pdtId = pdtId.toHexString();
      let newQtt;

      if (item.productId === pdtId) {
        if (op === 'sub') newQtt = pdt.quantity - item.quantity;
        if (op === 'add') newQtt = pdt.quantity + item.quantity;

        productsModel.update(pdtId, pdt.name, newQtt);
      }
    }),
  );

const update = async (items) => {
  const pdtsInStock = await Promise.all(items.map((item) =>
    productsModel.readById(item.productId)));
  const ok = verifyQttInStock(pdtsInStock, items);

  if (!ok) {
    return {
      done: false,
      msg: errors[1],
    };
  }

  await updateQttInStock(pdtsInStock, items, 'sub');

  return {
    done: true,
  };
};

const del = async (id) => {
  const sale = await salesModel.readById(id);
  const pdtsInStock = await Promise.all(sale.itensSold.map((item) =>
    productsModel.readById(item.productId)));

  await updateQttInStock(pdtsInStock, sale.itensSold, 'add');
};

module.exports = {
  update,
  del,
};

const salesModel = require('../models/salesModel');

const invalidInput = (req, res, next) => {
  const itensSold = req.body;
  let inputNumber = true;
  itensSold.forEach((item) => {
    if (isNaN(item.quantity) || item.quantity < 1) {
      inputNumber = false;
    }
  });
  if (!inputNumber) {
    return res.status(422).send({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  return next();
};

const add = async (req, res) => {
  const itensSold = req.body;
  const addSales = await salesModel.add(itensSold);
  if (addSales) {
    return res.status(200).json(addSales);
  }
  return res.status(422).send({
    err: {
      message: 'Não foi possível cadastrar a venda',
    },
  });
};

const getAll = async (_req, res) => {
  const sales = await salesModel.getAll();
  if (sales) {
    return res.status(200).json({ sales });
  }
  return res.status(404).send({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesModel.getById(id);
  if (sale) {
    return res.status(200).json(sale);
  }
  return res.status(404).send({
    err: {
      code: 'not_found',
      message: 'Sale not found',
    },
  });
};

const update = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  const saleUpdate = await salesModel.update(id, itensSold);
  if (saleUpdate) {
    return res.status(200).json(saleUpdate);
  }
  return res.status(422).send({
    err: {
      message: 'Produto não encontrado',
    },
  });
};

module.exports = {
  invalidInput,
  add,
  getAll,
  getById,
  update,
};

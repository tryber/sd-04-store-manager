const rescue = require('express-rescue');
const { getByIdSalesServ, deleteSalesServ } = require('../services/salesServices');
const { insertSalesMod, getAllSalesMod, updateByIdSalesMod } = require('../models/salesModel');

const insertSalesCont = rescue(async (req, res) => {
  const [...itensSold] = req.body;

  const result = await insertSalesMod(itensSold);
  return res.status(200).json(result);
});

const getAllSalesCont = rescue(async (_req, res) =>
  res.status(200).json({ sales: await getAllSalesMod() }));
// const result = await getAllSalesMod();
// Não coloquei em uma variável por causa do CC - Similar blocks

const getByIdSalesCont = rescue(async (req, res) => {
  const { id } = req.params;
  const result = await getByIdSalesServ(id);
  if (result.err) return res.status(result.err.status).json(result);
  return res.status(200).json({ result });
});

const updateByIdSalesCont = rescue(async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;

  const result = await updateByIdSalesMod(id, itensSold);
  return res.status(200).json(result);
});

const deleteSalesCont = rescue(async (req, res) => {
  const { id } = req.params;
  const result = await deleteSalesServ(id);
  if (result.err) return res.status(result.err.status).json(result);

  return res.status(200).json(result);
});

module.exports = {
  insertSalesCont,
  getAllSalesCont,
  getByIdSalesCont,
  updateByIdSalesCont,
  deleteSalesCont,
};

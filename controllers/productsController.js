const rescue = require('express-rescue');
const { insertProdMod, getAllProdMod, updateByIdProdMod } = require('../models/productsModel');
const { listByIdProdServ, deleteProdServ } = require('../services/productsServices');

const insertProdCont = rescue(async (req, res) => {
  const { name, quantity } = req.body;

  const result = await insertProdMod(name, quantity);
  return res.status(201).json(result);
});

const listAllProdCont = rescue(async (_req, res) => {
  const result = await getAllProdMod();
  return res.status(200).json({ products: result });
});

const listByIdProdCont = rescue(async (req, res) => {
  const { id } = req.params;

  const result = await listByIdProdServ(id);
  if (result.err) return res.status(422).json(result);

  return res.status(200).json(result);
});

const updateByIdProdCont = rescue(async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const result = await updateByIdProdMod(id, name, quantity);
  if (result.err) return res.status(422).json(result);

  return res.status(200).json(result);
});

const deleteProdCont = rescue(async (req, res) => {
  const { id } = req.params;

  const result = await deleteProdServ(id);
  if (result.err) return res.status(422).json(result);

  return res.status(200).json(result);
});

module.exports = {
  insertProdCont,
  listAllProdCont,
  listByIdProdCont,
  updateByIdProdCont,
  deleteProdCont,
};

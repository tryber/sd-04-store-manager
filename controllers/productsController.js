const rescue = require('express-rescue');
const { insertProdMod, getAllProdMod, updateByIdProdMod } = require('../models/productsModel');
const { listByIdProdServ, deleteProdServ } = require('../services/productsServices');

const insertProdCont = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const result = await insertProdMod(name, quantity);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error insertProdCont!' });
  }
};

const listAllProdCont = async (_req, res) => {
  const result = await getAllProdMod();
  try {
    return res.status(200).json({ products: result });
  } catch (error) {
    res.status(500).json({ error: 'Error listAllProdCont!' });
  }
};

const listByIdProdCont = rescue(async (req, res) => {
  const { id } = req.params;
  // try {
  const result = await listByIdProdServ(id);
  if (result.err) return res.status(422).json(result);
  return res.status(200).json(result);
  // } catch (error) {
  //   res.status(500).json({ error: 'Error listByIdProdCont!' });
  // }
});

const updateByIdProdCont = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const result = await updateByIdProdMod(id, name, quantity);
    if (result.err) return res.status(422).json(result);

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error updateByIdProdCont!' });
  }
};

const deleteProdCont = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteProdServ(id);
    if (result.err) return res.status(422).json(result);

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error deleteProdCont!' });
  }
};

module.exports = {
  insertProdCont,
  listAllProdCont,
  listByIdProdCont,
  updateByIdProdCont,
  deleteProdCont,
};

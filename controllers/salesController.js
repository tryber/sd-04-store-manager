const { getByIdSalesServ, deleteSalesServ } = require('../services/salesServices');
const { insertSalesMod, getAllSalesMod, updateByIdSalesMod } = require('../models/salesModel');

const insertSalesCont = async (req, res) => {
  const [...itensSold] = req.body;

  try {
    const result = await insertSalesMod(itensSold);
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error insertSalesCont!' });
  }
};

const getAllSalesCont = async (_req, res) => {
  // const result = await getAllSalesMod(); //CC
  try {
    return res.status(200).json({ sales: await getAllSalesMod() });
  } catch (error) {
    res.status(500).json({ error: 'Error getAllSalesCont!' });
  }
};

const getByIdSalesCont = async (req, res) => {
  const { id } = req.params;
  const result = await getByIdSalesServ(id);
  try {
    if (result.err) return res.status(result.err.status).json(result);
    return res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Error getByIdSalesCont!' });
  }
};

const updateByIdSalesCont = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  try {
    const result = await updateByIdSalesMod(id, itensSold);
    if (result.err) return res.status(422).json(result);

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error updateByIdSalesCont!' });
  }
};

const deleteSalesCont = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteSalesServ(id);
    console.log('deleteSalesCont', result);
    if (result.err) return res.status(result.err.status).json(result);
    // if (result.err && result.err.code === 'Wrong sale ID format')
    // return res.status(422).json(result);
    // if (result.err && result.err.code === 'not_found') return res.status(404).json(result);

    return res.status(200).json(result);
  } catch (error) {
    console.log('deleteSalesCont', error);
    res.status(500).json({ error: 'Error deleteSalesCont!' });
  }
};

module.exports = {
  insertSalesCont,
  getAllSalesCont,
  getByIdSalesCont,
  updateByIdSalesCont,
  deleteSalesCont,
};

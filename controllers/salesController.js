const { getByIdSalesServ } = require('../services/salesServices');
const { insertSalesMod, getAllSalesMod } = require('../models/salesModel');

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
    return res.status(200).json({ sales: (await getAllSalesMod()) });
  } catch (error) {
    res.status(500).json({ error: 'Error getAllSalesCont!' });
  }
};

const getByIdSalesCont = async (req, res) => {
  const { id } = req.params;
  const result = await getByIdSalesServ(id);
  try {
    if (result.err) return res.status(422).json(result);
    return res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Error getByIdSalesCont!' });
  }
};

module.exports = { insertSalesCont, getAllSalesCont, getByIdSalesCont };

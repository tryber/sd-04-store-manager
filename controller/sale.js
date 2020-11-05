const Service = require('../service/sale');

const postNewSale = async (req, res) => {
  const itensSold = await Service.postNewSale(req.body);
  return res.status(200).json(itensSold);
};

const getAllSale = async (_req, res) => {
  const sales = await Service.getAllSale();
  res.status(200).json({ sales });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await Service.getSaleById(id);
  res.status(200).json(sale);
};

const putSale = async (req, res) => {
  const { id } = req.params;
  const itensSold = req.body;
  const sale = await Service.putSale(id, itensSold);
  return res.status(200).json(sale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const sale = await Service.deleteSale(id);

  return res.status(200).json({ sale });
};

module.exports = {
  getAllSale,
  postNewSale,
  getSaleById,
  putSale,
  deleteSale,
};

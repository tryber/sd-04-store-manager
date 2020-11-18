const { vendasService } = require('../services');

const getAllVendas = async (_req, res) => {
  const sales = await vendasService.getAllVendas();

  return res.status(200).json({ sales });
};

const findVendaById = async (req, res) => {
  const { id } = req.params;
  const sale = await vendasService.findVendaById(id);

  if (sale.err) return res.status(404).json(sale);

  return res.status(200).json(sale);
};

module.exports = {
  getAllVendas,
  findVendaById,
};

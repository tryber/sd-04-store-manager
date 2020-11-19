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

const criarVenda = async (req, res) => {
  const sales = req.body;

  const createdSale = await vendasService.criarVenda(sales);

  if (createdSale.err) {
    if (createdSale.err.code === 'stock_problem') return res.status(404).json(createdSale);
    return res.status(422).json(createdSale);
  }
  return res.status(200).json(createdSale);
};

const upVenda = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const newSale = await vendasService.upVenda(id, sale);

  if (newSale.err) return res.status(422).json(newSale);

  return res.status(200).json(newSale);
};

const deleteVenda = async (req, res) => {
  const { id } = req.params;

  if (id.length < 24) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }

  const sale = await vendasService.deleteVenda(id);

  if (sale && sale.err) return res.status(404).json(sale);

  return res.status(200).end();
};

module.exports = {
  getAllVendas,
  criarVenda,
  findVendaById,
  upVenda,
  deleteVenda,
};

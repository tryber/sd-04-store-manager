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

  const testeVendas = await vendasService.criarVenda(sales);

  if (testeVendas.err) {
    if (testeVendas.err.code === 'stock_problem') return res.status(404).json(testeVendas);
    return res.status(422).json(testeVendas);
  }
  return res.status(200).json(testeVendas);
};

const upVenda = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const newVenda = await vendasService.upVenda(id, sale);

  if (newVenda.err) return res.status(422).json(newVenda);

  return res.status(200).json(newVenda);
};

const deleteVendas = async (req, res) => {
  const { id } = req.params;

  if (id.length < 24) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
};

module.exports = {
  getAllVendas,
  findVendaById,
  criarVenda,
  deleteVendas,
  upVenda,
};

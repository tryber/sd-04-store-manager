const { cadastro, findAll, findById } = require('../models/productsModels');

const cadastroVenda = async (req, res) => {
  try {
    const cad = await cadastro({ itensSold: req.body });

    return res.status(200).json(cad);
  } catch (_e) {
    res.status(500).json({ err: { code: 'invalid_data', message: 'Erro inesperado' } });
  }
};

const listAllSales = async (_req, res) => {
  const loadSales = await findAll();
  if (!loadSales) res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  return res.status(200).json({ sales: loadSales });
};

const listOneSale = async (req, res) => {
  const { id } = req.params;
  const sale = await findById(id);
  if (!sale) res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  return res.status(200).json(sale);
};


module.exports = {
  cadastroVenda,
  listAllSales,
  listOneSale,
};

const salesModel = require('../models/salesModel');
const productModel = require('../models/productsModel');

const readSales = async (_, res) => {
  const sales = await productModel.getAll('sales');
  return res.status(200).json({ sales });
};

const readById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await productModel.findById(id, 'sales');
    return res.status(200).json(sale);
  } catch (err) {
    res.status(422).json({
      err: { code: 'invalid_data', message: 'Sale not found' },
    });
  }
};

const create = async (req, res) => {
  const [...products] = req.body;
  const add = await salesModel.add(...products);
  res.status(200).json(add);
};

// router.put('/:id', async (_, res) => res.status(200).send('oi'));

// router.delete('/:id', async (_, res) => res.status(200).send('oi'));

module.exports = {
  readSales,
  readById,
  create,
};

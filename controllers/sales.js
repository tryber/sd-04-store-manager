const salesModel = require('../model/sales');

const createSale = async ({ body }, res) => {
  const sales = body;
  salesModel.create(sales).then((result) => res.status(200).json(result.ops[0]));
};

const listSales = async (_req, res) => {
  const sales = await salesModel.sales();
  res.status(200).json({ sales });
};

const getSale = async (req, res) =>
  salesModel
    .sale(req.params.id)
    .then((sales) =>
      (sales
        ? res.status(200).json(sales)
        : res.status(404).send({ err: { message: 'Sale not found', code: 'not_found' } })))
    .catch(() => res.status(404).send({ err: { message: 'Sale not found', code: 'not_found' } }));

const updateSales = async (req, res) => {
  const sales = req.body;
  const { id } = req.params;

  salesModel
    .updateSale(id, sales)
    .then(() => res.status(200).json(res.json({ _id: id, itensSold: sales })));
};

const deleteSales = async (req, res) => {
  try {
    const result = await salesModel.deleteSale(req.params.id);

    if (result.n > 0) return res.status(200).send('Sale deleted');

    return res.status(200).json(result);
  } catch (error) {
    res.status(422).send({ err: { message: 'Wrong sale ID format', code: 'invalid_data' } });
  }
};

module.exports = { createSale, listSales, updateSales, deleteSales, getSale };

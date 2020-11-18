const { vendasModel, produtoModel } = require('../models');
const { isValid } = require('../validations/index');

const getAllVendas = async () => vendasModel.getAllVendas();

const criarVenda = async (sales) => {
  const sale = await isValid.vendaValidation(sales);

  if (sale.err) return sale;

  await Promise.all(sales.map(async ({ pId, quantity }) => {
    const product = await produtoModel.findProdutoById(pId);
    const newStock = product[0].quantity - quantity;
    await vendasModel.upProduto(pId, product.name, newStock);
  }));

  return vendasModel.criarVenda(sales);
};

const findVendaById = async (id) => {
  if (id.length < 24) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }

  const saleId = await vendasModel.findVendaById(id);

  if (!saleId) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  return saleId;
};

module.exports = {
  getAllVendas,
  findVendaById,
  criarVenda,
};

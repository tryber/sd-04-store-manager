const { vendasModel } = require('../models');

const getAllVendas = async () => vendasModel.getAllVendas();

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
};

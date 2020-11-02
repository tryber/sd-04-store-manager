const salesService = require('../services/salesService');

const validaId = async (req, res, next) => {
  const { body } = req;

  if (!(await salesService.valida(body))) {
    return res.json({ message: 'Valida' });
  }

  next();
};

module.exports = {
  validaId,
};

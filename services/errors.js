// Código baseado na brilhante organização da aluna Trybe Alice Atalla T04,
// No intuito de resolver CodeClimate issues.

const { HTTPStatus } = require('../config/index');

const serverInternalError = (res) =>
  res
    .status(HTTPStatus.INTERNAL_ERROR)
    .json({ error: { message: 'Erro Interno', code: HTTPStatus.INTERNAL_ERROR } });

const clientUnprocessableEntityError = (res, message) =>
  res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({
    err: {
      code: 'invalid_data',
      message,
    },
  });

const TemplateMessage = (message, code) => ({
  err: {
    code,
    message,
  },
});

module.exports = {
  serverInternalError,
  clientUnprocessableEntityError,
  TemplateMessage,
};

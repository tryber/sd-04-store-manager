const { HTTPStatus } = require('../config');

const errorIntern = (res) =>
  res
    .status(HTTPStatus.INTERN_ERROR)
    .json({ error: { message: 'Erro Interno', code: HTTPStatus.INTERN_ERROR } });

const errorUnprocessableEntity = (res, message) =>
  res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({
    err: {
      code: 'invalid_data',
      message,
    },
  });

module.exports = { errorIntern, errorUnprocessableEntity };

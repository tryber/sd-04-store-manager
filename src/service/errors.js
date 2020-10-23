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

const erroNotFound = (res, message) =>
  res.status(HTTPStatus.NOT_FOUND).json({
    err: {
      code: 'not_found',
      message,
    },
  });

module.exports = { errorIntern, errorUnprocessableEntity, erroNotFound };

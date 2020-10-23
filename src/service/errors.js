const { HTTPStatus } = require('../config');

const errorMessage = (message, code) => ({
  err: {
    code,
    message,
  },
});

const errorsMessages = (res, message, code) => {
  switch (code) {
    case 'invalid_data':
      return res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json(errorMessage(message, code));
    case 'not_found':
      return res.status(HTTPStatus.NOT_FOUND).json(errorMessage(message, code));
    default:
      return res
        .status(HTTPStatus.INTERN_ERROR)
        .json({ error: { message: 'Erro Interno', code: HTTPStatus.INTERN_ERROR } });
  }
};

module.exports = {
  errorsMessages,
};

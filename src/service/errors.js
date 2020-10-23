const { HTTPStatus } = require('../config');

const errorUnprocessableEntity = (res, message) =>
  res.status(HTTPStatus.UNPROCESSABLE_ENTITY).json({
    err: {
      code: 'invalid_data',
      message,
    },
  });

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

// const wrongIdFormat = (res, data) => {
//   if (data === null) {
//     return res
//       .status(HTTPStatus.UNPROCESSABLE_ENTITY)
//       .errorMessage('Wrong id format', 'invalid_data');
//   }
//   return true;
// };

module.exports = {
  errorsMessages,
  errorUnprocessableEntity,
  // wrongIdFormat,
  errorMessage,
};

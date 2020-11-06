const errorMessage = (message, code) => ({
  err: {
    code,
    message,
  },
});

const errorsMessages = (res, message, code) => {
  switch (code) {
    case 'invalid_data':
      return res.status(422).json(errorMessage(message, code));
    case 'not_found':
      return res.status(404).json(errorMessage(message, code));
    default:
      return res
        .status(500)
        .json({ error: { message: 'Erro Interno', code: 500 } });
  }
};

module.exports = {
  errorsMessages,
};

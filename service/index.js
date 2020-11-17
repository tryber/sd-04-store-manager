const messageFunction = (message) => {
  return {
    err: {
      code: 'invalid_data',
      message,
    },
  };
};

module.exports = messageFunction;

const buildResponse = (code, message) => {
  const resp = { err: { code, message } };
  return resp;
};

module.exports = { buildResponse };

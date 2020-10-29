const Validation = require('../service/validations');

const authPost = async (req, res, next) => {
  const { name, quantity } = req.body;

  const response = await Validation.isValidPost(name, quantity);

  if (response) {
    return res.status(response.status).json(response.error);
  }

  console.log('Middleware Post OK NEXT');
  next();
};

const authGet = async (req, res, next) => {
  const { id } = req.params;

  if (!id) { return next(); }

  const response = await Validation.isValidGet(id);

  if (response) { return res.status(response.status).json(response.error); }

  console.log('Middleware Get OK NEXT');
  next();
};

const authPut = async (req, res, next) => {
  const { name, quantity } = req.body;

  const response = await Validation.isValidPut(name, quantity);

  if (response) {
    return res.status(response.status).json(response.error);
  }

  console.log('Middleware Put OK NEXT');
  next();
};

module.exports = {
  authPost,
  authGet,
  authPut,
};

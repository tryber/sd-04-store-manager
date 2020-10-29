const nameTest = (req, res, next) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(422).json("'name' nao é uma string");
  } else if (name.length <= 5) {
    return res.status(422).json("'name' tem que ter mais de 5 caracteres");
  }
  next();
};

const quantityTest = (req, res, next) => {
  const { quantity } = req.body;
  console.log( Number.isInteger(quantity));
  if (!quantity || !Number.isInteger(quantity)) {
    return res.status(422).json('O numero nao é um inteiro');
  }
  next();
};

module.exports = { nameTest, quantityTest };

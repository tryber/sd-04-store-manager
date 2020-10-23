const dataStore = require('../models/dataModel');
const storeService = require('../service/storeService');

const cadastraProduto = async (req, res) => {
  const { name, quantity } = req.body;
  console.log(name);
  const errorCode = 422

  const nameProd = await dataStore.findByName({ name });

  if (name.length <= 5) {
    storeService.countProductSize(res, errorCode);
  }
  if (quantity <= 0) {
    storeService.countMoreThenZero(res, errorCode);
  }
  if (typeof quantity === 'string') {
    storeService.verifyString(res, errorCode);
  }
  if (nameProd && nameProd.name === name) {
    storeService.verifyWithExist(res, errorCode);
  }
  {
    const product = await dataStore.cadastraProduto(name, quantity);
    console.log(product);

    res.status(201).json(product);
  }
};

module.exports = {
  cadastraProduto,
};

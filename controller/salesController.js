const salesModel = require('../models/salesModel');
const productService = require('../service/productService');

const cadastraVenda = async (req, res) => {
  const filteredValueCount = req.body.filter((value) => value.quantity <= 0);
  const filteredValueType = req.body.filter((value) => typeof value.quantity === 'string');

  if (filteredValueCount.length !== 0 || filteredValueType.length !== 0) {
    productService.wrongIdFormat(res);
  }

  const obj = await salesModel.cadastraVenda(req.body);
  res.status(200).json(obj);
};

module.exports = {
  cadastraVenda,
};
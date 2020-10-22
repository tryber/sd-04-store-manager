const express = require('express');
const productModel = require('../model/productModel');
const validate = require('../middlewares/validate');

const router = express.Router();

// Listar todos os produtos
router.get('/', async (req, res) => {
  const products = await productModel.getAll();
  return res.status(200).json(products);
});

// Adicionar um produto
router.post(
  '/',
  validate.validateName,
  validate.validateIfExistsProduct,
  validate.validateQuantity,
  async (req, res) => {
    const { name, quantity } = req.body;
    const product = await productModel.add(name, quantity);
    return res.status(201).json(product);
  },
);

module.exports = router;

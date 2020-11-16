const express = require('express');

const router = express.Router();
const validation = require('../middlewares/validations');
const productsModel = require('../models/productsModel');

// Mostrar todos os produtos
router.get('/', async (req, res) => {
  const allProducts = await productsModel.getAllProducts();
  return res.status(200).json({ allProducts });
});

// Cadastrar produtos
router.post('/',
  validation.nameValidation,
  validation.quantityValidation,
  validation.existingNameValidation,
  async (req, res) => {
    const { name, quantity } = req.body;
    const newProduct = await productsModel.registerProducts(name, quantity);
    return res.status(201).json(newProduct);
  });

module.exports = router;

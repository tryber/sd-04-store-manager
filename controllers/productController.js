const express = require('express');
const router = express.Router();

const productService = require('../services/productService');

router.get('/', async (req, res) => {
  res.send("ALO MUNDO");
})

router.post('/', async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const produto = await productService.add(name, quantity);
  
    res.status(201).json(produto)
  } catch (_err) {
    console.log(_err.message)
    res.status(500).json({ message: 'Erro ao cadadastrar o produto' });
  }
})

module.exports = router;

const express = require('express');

const router = express.Router();
const validation = require('../middlewares/validations');
const productsModel = require('../models/productsModel');

// Mostrar todos os produtos
router.get('/', async (req, res) => {
  const products = await productsModel.getAllProducts();
  return res.status(200).json({ products });
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

// Listar produtos por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productsModel.findById(id);

  if (!product) return res.status(422).json(validation.buildError('invalid_data', 'Wrong id format'));
  return res.status(200).json(product);
});

// Atualizar produtos
router.put('/:id',
  validation.nameValidation,
  validation.quantityValidation,
  validation.existingNameValidation,
  async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;
    await productsModel.updateProduct(id, name, quantity);
    const product = await productsModel.findById(id);
    return res.status(200).json(product);
  });

// Deletar produtos
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await productsModel.findById(id);

  if (!deleteProduct) {
    return res.status(422).json(validation.buildError('invalid_data', 'Wrong id format'));
  }
  await productsModel.deleteProduct(id);
  return res.status(200).json(deleteProduct);
});

module.exports = router;

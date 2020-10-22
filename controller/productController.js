const express = require('express');
const productModel = require('../model/productModel');
const validate = require('../middlewares/validate');

const router = express.Router();

// Listar todos os produtos
router.get('/', async (_req, res) => {
  const products = await productModel.getAll();
  return res.status(200).json({ products });
});

// Listar produto especifico por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await productModel.getById(id);

  if (!product) {
    return res.status(422).json(validate.buildErrors('invalid_data', 'Wrong id format'));
  }

  return res.status(200).json(product);
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

// Atualizar um produto
router.put('/:id', validate.validateName, validate.validateQuantity, async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const oldProduct = await productModel.getById(id);

  if (!oldProduct) {
    return res.status(422).json(validate.buildErrors('invalid_data', 'Wrong id format'));
  }

  await productModel.update(id, name, quantity);
  const product = await productModel.getById(id);
  return res.status(200).json(product);
});

// Deletar um produto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const removeProduct = await productModel.getById(id);

  if (!removeProduct) {
    return res.status(422).json(validate.buildErrors('invalid_data', 'Wrong id format'));
  }

  await productModel.remove(id);
  return res.status(200).json(removeProduct);
});

module.exports = router;

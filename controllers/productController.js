// SECTION ProductController
const express = require('express');
const validations = require('../middlewares/productValidation');
const productModel = require('../models/productModel');

const router = express.Router();

/**
 * ANCHOR ADD
 *
 * POST /products
 */
router.post(
  '/',
  // Executa validações antes de cadastrar o produto no banco
  validations.validate_Quantity_Type,
  validations.validate_Name_Quantity_Length,
  validations.validateProductExisteByName,
  // Realiza o cadastro no banco
  async (req, res) => {
    try {
      const { name, quantity } = req.body;

      const product = await productModel.addProduct(name, quantity);

      res.status(201).json({ product });
    } catch (_e) {
      res.status(501).json({ message: 'Falha ao cadastrar produto' });
    }
  },
);

/**
 * ANCHOR PUT
 *
 * PUT /products/id
 */
router.put(
  '/:id',
  // Executa validações antes de atualizar o produto no banco
  validations.validate_Quantity_Type,
  validations.validate_Name_Quantity_Length,
  validations.validateProductExisteByName,
  validations.validateExistId,
  // Realiza o update no banco
  async (req, res) => {
    try {
      const { name, quantity } = req.body;

      // Atualiza o produto
      await productModel.update(req.params.id, name, quantity);
      // Obtên o produto atualizado
      const productUpdate = await productModel.findById(req.params.id);
      res.status(200).json(productUpdate);
    } catch (_e) {
      res.status(501).json({ message: 'Falha ao atualizar produto' });
    }
  },
);

/**
 * ANCHOR DELETE
 *
 * DELETE /products/id
 *
 * Está variável é passada pelo middleware validations.validateId
 * @param req.products
 */
router.delete('/:id', validations.validateExistId, async (req, res) => {
  // Remove o produto
  await productModel.remove(req.params.id);
  // Retonar os dados do produto removido
  res.status(200).json(req.products);
});

/**
 * ANCHOR GET ALL
 *
 * GET /products
 */
router.get('/', async (req, res) => {
  // Retornar todos os produtos
  const products = await productModel.findAll();
  res.status(200).json({ products });
});

/**
 * ANCHOR GET ID
 *
 * GET /products/id
 *
 * Está variável é passada pelo middleware validations.validateId
 * @param req.products
 */
router.get('/:id', validations.validateExistId, async (req, res) => {
  res.status(200).json(req.products);
});

module.exports = router;

// !SECTION

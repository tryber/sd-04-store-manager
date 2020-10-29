// SECTION SalesController
const express = require('express');
const validations = require('../middlewares/salesValidation');
const salesModel = require('../models/salesModel');

const router = express.Router();

/**
 * ANCHOR ADD
 *
 * POST /sales
 */
router.post(
  '/',
  validations.validate_Quantity_Length,
  validations.validate_Quantity_Type,
  async (req, res) => {
    try {
      const { body } = req;
      // console.log(body);

      const sales = await salesModel.addSales(body);

      res.status(200).json(sales);
    } catch (_e) {
      res.status(501).json({ message: 'Falha ao cadastrar produto' });
      // console.log(_e);
    }
  },
);

/**
 * ANCHOR GET ALL
 *
 * GET /products
 */
router.get('/', async (req, res) => {
  // Retornar todos os produtos
  const sales = await salesModel.findAll();
  res.status(200).json({ sales });
});

/**
 * ANCHOR PUT
 *
 * PUT /sales/id
 */

router.put(
  '/:id',
  // Executa validações antes de atualizar o produto no banco
  validations.validateExistId,
  validations.validate_Quantity_Type,
  validations.validate_Quantity_Length,
  // Realiza o update no banco
  async (req, res) => {
    try {
      const { body } = req;
      // console.log(body);

      // Atualiza o produto
      await salesModel.update(req.params.id, body);
      // Obtên o produto atualizado
      const salesUpdate = await salesModel.findById(req.params.id);
      res.status(200).json(salesUpdate);
    } catch (_e) {
      res.status(501).json({ message: 'Falha ao atualizar produto' });
      // console.log(_e);
    }
  },
);

/**
 * ANCHOR GET ID
 *
 * GET /products/id
 *
 * Está variável é passada pelo middleware validations.validateId
 * @param req.sales
 */
router.get('/:id', validations.validateExistId, async (req, res) => {
  res.status(200).json(req.sales);
});

/**
 * ANCHOR DELETE
 *
 * DELETE /products/id
 *
 * Está variável é passada pelo middleware validations.validateId
 * @param req.sales
 */
router.delete('/:id', validations.validateExistId, async (req, res) => {
  // Remove o produto
  await salesModel.removeSales(req.params.id);
  // Retonar os dados do produto removido
  res.status(200).json(req.sales);
});

module.exports = router;

// !SECTION

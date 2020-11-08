// SECTION SalesController
const express = require('express');
const validations = require('../middlewares/salesValidation');
const utilsModel = require('../service/model');
const salesSerice = require('../service/salesService');

const router = express.Router();

/**
 * ANCHOR ADD
 *
 * POST /sales
 */
router.post(
  '/',
  validations.validateQuantityLength,
  validations.validateQuantityType,
  async (req, res) => {
    try {
      const { body } = req;
      console.log(body);

      // const sales = await salesModel.addSales(body);
      const sales = await salesSerice.add(body);
      if (!sales) {
        return res.status(404).json({
          err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
        });
      }
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
  const sales = await utilsModel.findAll('sales');
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
  validations.validateQuantityType,
  validations.validateQuantityLength,
  // Realiza o update no banco
  async (req, res) => {
    try {
      const { body } = req;
      // console.log(body);

      // Atualiza o produto
      const saleUpdate = await salesSerice.update(req.params.id, body);
      // Obtên o produto atualizado
      // const salesUpdate = await utilsModel.findById(req.params.id, 'sales');
      // console.log('resulta update', saleUpdate);
      if (!saleUpdate) {
        return res.status(404).json({
          err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
        });
      }
      // console.log('status 200');
      res.status(200).json(saleUpdate.value);
    } catch (_e) {
      console.log('erro');
      res.status(501).json({ message: 'Error.' });
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
  await utilsModel.remove(req.params.id, 'sales');
  // Retonar os dados do produto removido
  res.status(200).json(req.sales);
});

module.exports = router;

// !SECTION

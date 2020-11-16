const express = require('express');
const salesModel = require('../models/salesModel');
const saleValidation = require('../middlewares/saleValidations');
const returnResponse = require('../services/returnResponse');
const salesService = require('../services/salesService');

const router = express.Router();

router.post('/', saleValidation.validateQuantity, async (req, res) => {
  try {
    const { body } = req;
    const sales = await salesService.insertSale(body, true);
    if (sales.error) {
      return res.status(404).json(returnResponse(sales.error.code, sales.error.message));
    }
    res.status(200).json(sales);
  } catch (_err) {
    res.status(500).json(returnResponse('internal_error', 'Error registering sale'));
  }
});

router.get('/', async (_req, res) => {
  try {
    const sales = await salesModel.getAllSales();
    res.status(200).json({ sales });
  } catch (_err) {
    res.status(404).json(returnResponse('not_found', 'Sale not found'));
  }
});

// router.get('/', (_req, res) => {
//   salesModel
//     .getAllSales()
//     .then((sales) => {
//       res.status(200).json({ sales });
//     })
//     .catch((_err) => {
//       res.status(404).json(returnResponse('not_found', 'Sale not found'));
//     });
// });

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesModel.getSaleById(id);
    if (!sale) {
      return res.status(404).json(returnResponse('not_found', 'Sale not found'));
    }
    res.status(200).json(sale);
  } catch (_err) {
    res.status(404).json(returnResponse('not_found', 'Sale not found'));
  }
});

// router.get('/:id', (req, res) => {
//   const { id } = req.params;
//   salesModel
//     .getSaleById(id)
//     .then((sale) => {
//       if (!sale) {
//         return res.status(404).json(returnResponse('not_found', 'Sale not found'));
//       }
//       res.status(200).json(sale);
//     })
//     .catch((_err) => {
//       res.status(404).json(returnResponse('not_found', 'Sale not found'));
//     });
// });

router.put('/:id', saleValidation.validateQuantity, async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedSale = await salesService.updateSale(id, body);
    res.status(200).json(updatedSale);
  } catch (_err) {
    res.status(500).json(returnResponse('internal_error', 'Error updating sale'));
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesService.deleteSale(id, true);
    res.status(200).json(sale);
  } catch (_err) {
    res.status(422).json(returnResponse('invalid_data', 'Wrong sale ID format'));
  }
});

module.exports = router;

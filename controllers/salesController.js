const express = require('express');
const salesModel = require('../models/salesModel');
const saleValidation = require('../middlewares/saleValidations');
const returnResponse = require('../services/returnResponse');

const router = express.Router();

router.post('/', saleValidation.validateQuantity, async (req, res) => {
  try {
    const { body } = req;
    const sales = await salesModel.insertSale(body);
    res.status(200).json(sales);
  } catch (_err) {
    res.status(500).json(returnResponse('internal_error', 'Error registering sale'));
  }
});

// router.get('/', async (_req, res) => {
//   try {
//     const sales = await salesModel.getAllSales();
//     res.status(200).json(sales);
//   } catch (_err) {
//     res.status(404).json(returnResponse('not_found', 'Sale not found'));
//   }
// });

router.get('/', (_req, res) => {
  salesModel
    .getAllSales()
    .then((sales) => {
      res.status(200).json({ sales });
    })
    .catch((_err) => {
      res.status(404).json(returnResponse('not_found', 'Sale not found'));
    });
});

// router.get('/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const sale = await salesModel.getSaleById(id);
//     res.status(200).json(sale);
//   } catch (_err) {
//     res.status(404).json(returnResponse('not_found', 'Sale not found'));
//   }
// });

router.get('/:id', saleValidation.checkSaleExistence, (req, res) => {
  const { id } = req.params;
  salesModel
    .getSaleById(id)
    .then((sale) => {
      if (!sale) {
        return res.status(404).json(returnResponse('not_found', 'Sale not found'));
      }
      res.status(200).json(sale);
    })
    .catch((_err) => {
      res.status(404).json(returnResponse('not_found', 'Sale not found'));
    });
});

router.put('/:id', saleValidation.validateQuantity, async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    await salesModel.updateSale(id, body);
    const updatedSale = await salesModel.getSaleById(id);
    res.status(200).json(updatedSale);
  } catch (_err) {
    console.log(_err);
    res.status(500).json(returnResponse('internal_error', 'Error updating sale'));
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSale = await salesModel.getSaleById(id);
    await salesModel.deleteSale(id);
    res.status(200).json(deletedSale);
  } catch (_err) {
    res.status(422).json(returnResponse('invalid_data', 'Wrong sale ID format'));
  }
});

module.exports = router;

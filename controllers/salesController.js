const express = require('express');
const { findById, getAll } = require('../models/dbModel');
const router = express.Router();

// router.post('/', (req, res) => {
//   const { productId, quantity } = req.body;
// });

router.get('/', async (req, res) => {
  const sales = await getAll('sales');
  try {
    return res.status(200).json({ sales });
  } catch (err) {
    console.error(err);
    throw res.status(500);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await findById(id, 'sales');
  try {
    if (!sale) {
      res.status(404);
      return res.json({
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
      });
    }
    return res.status(200).json(sale);
  } catch (err) {
    console.error(err);
    throw res.status(500);
  }
});

module.exports = router;

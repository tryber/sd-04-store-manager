const express = require('express');
const salesVerify = require('../middlewares/salesVerify');
const salesController = require('../controllers/salesController');

const router = express.Router();

const { quantityVerify } = salesVerify;
const {
  getSalesController,
  postSalesController,
  getSalesDetailsController,
  putSalesDetailsController,
  deleteSalesController,
} = salesController;

router.get('/', getSalesController);

router.post('/', quantityVerify, postSalesController);

router.get('/:id', getSalesDetailsController);

router.put('/:id', quantityVerify, putSalesDetailsController);

router.delete('/:id', deleteSalesController);

module.exports = router;

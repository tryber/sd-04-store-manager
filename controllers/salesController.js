const express = require('express');
const validationSalles = require('../middlewares/validationSales');
const salesModel = require('../model/salesModel');

const router = express.Router();
const buildResult = (_id, itensSold) => ({
  _id,
  itensSold,
});

router.post('/', validationSalles.quantityProduct, async (req, res) => {
  try {
    const productSale = await salesModel.addSale(req.body);
    const { _id, itensSold } = productSale.ops[0];
    res.status(200).json(buildResult(_id, itensSold));
  } catch (_e) {
    console.log(_e);
    res.status(501).json({ message: 'registration failed...' });
  }
});

router.get('/', validationSalles.showSales, async (req, res) => {
  try {
    const allList = await salesModel.listAllSales();
    return res.status(200).json({ sales: allList });
  } catch (_e) {
    console.log(_e);
    res.status(404).json({ message: 'failed to show the list...' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('controller-id', id);
  try {
    const specificSale = await salesModel.findSale(id);
    console.log('controller', specificSale);
    if (specificSale) {
      return res.status(200).json({ sales: specificSale });
    }
  } catch (_e) {
    console.log(_e);
    res.status(404).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }
});
module.exports = router;

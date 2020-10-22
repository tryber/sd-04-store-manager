const productsService = require('../service/productsService');

const express = require('express');

const router = express.Router();

router.post('/products', async (req, res) => {
  const { name, quantity } = req.body;
  console.log(name, quantity);
  try {
    const productAdded = await productsService.create(name, quantity);
    if (productAdded.err) {
      return res.status(422).json(productAdded);
    }
    return res.status(201).json({ productAdded });
  } catch (_e) {
    res.status(500);
  }
});

// const products = async (req, res) => {
//   // const allProducts = await productsModel.getAllProducts();
//   res.status(201).send({});
// };

module.exports = router;

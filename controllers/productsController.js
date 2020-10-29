const express = require('express');
const model = require('../models');

const router = express.Router();

router.post('/', async ({ body: { name, quantity } }, res) =>
  model
    .create('products', { name, quantity })
    .then((insertedProduct) => res.status(201).json(insertedProduct))
    .catch((err) => res.status(500).json({ err })),
);

module.exports = router;

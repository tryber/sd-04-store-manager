const express = require('express');
const crud = require('../models/crud');
const model = require('../models/crud');

const router = express.Router();

router.post('/', async ({ body: { name, quantity } }, res) =>
  model
    .create('products', { name, quantity })
    .then((insertedProduct) => res.status(201).json(insertedProduct))
    .catch((err) => res.status(500).json({ err })),
);

router.get('/', async (_req, res) =>
  crud.readAll().then((products) => res.status(200).json(products)),
);

module.exports = router;

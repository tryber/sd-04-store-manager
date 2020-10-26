const { createProductVal, createProduct } = require('../middlewares');

const express = require('express'),
       rescue = require('express-rescue'),
       router = express.Router();

router.post('/', rescue(createProductVal), rescue(createProduct));

module.exports = router;

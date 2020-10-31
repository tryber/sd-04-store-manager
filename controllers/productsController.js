const express = require('express');
const router = express.Router();
const ProductsServices = require('../services/productsServices');

router.post('/', async (req, res) => {
    const { name, quantity } = req.body;
    const product = await ProductsServices.createProduct(name, quantity);

    if (product.error) return res.status(422).json({ err: product.err });
    return res.status(201).json(product);
});
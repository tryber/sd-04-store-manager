// const express = require('express');
const { Joi } = require('frisby');
const productModel = require('../models/productModel');
// const router = express.Router();

const productSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().integer().min(1).required(),
});

const getProducts = async (req, res) => {
  const products = await productModel.getAllProducts();
  res.status(200).json({ products: products});
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productModel.getProductById(id);

  if (!product) {
    return res.status(422).json({ err: { code: 'invalid_data', message: 'Wrong id format' } });
  }
  res.status(200).json(product);
};

const registerProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    await productSchema.validate(req.body);

    const exists = await productModel.getProductByName(name);
    if (!exists) {
      const product = await productModel.addProduct(name, quantity);

      res.status(201).json(product);
    } else {
      res.status(422).json({ err: { code: 'invalid_data', message: 'Product already exists' } });
    }
  } catch (er) {
    console.log('erros', er);
    res.status(422).json({ err: { code: 'invalid_data', message: er.details[0].message } });
  }
};

module.exports = {
  getProducts,
  getProductById,
  registerProduct,
};

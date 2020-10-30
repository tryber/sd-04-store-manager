const productModel = require('../model/products');

const listProducts = async (_req, res) =>
  productModel.products().then((products) => res.status(200).json({ products }));

const getProduct = async (req, res) =>
  productModel
    .product(req.params.id)
    .then((products) => res.status(200).json(products))
    .catch((err) =>
      res.status(422).send({ err: { message: 'Wrong id format', code: 'invalid_data' } }));

const createProduct = async (req, res) => {
  const product = req.body;

  productModel
    .createProduct(product)
    .then((result) => res.status(201).send(result))
    .catch((err) =>
      res.status(422).send({ err: { message: 'Product already exists', code: 'invalid_data' } }));
};

const updateProduct = async (req, res) => {
  const productData = req.body;
  const { id } = req.params;

  productModel
    .updateProduct(id, productData)
    .then(() =>
      res
        .status(200)
        .json(res.json({ _id: id, name: productData.name, quantity: productData.quantity })));
};

const deleteProduct = async (req, res) =>
  productModel
    .deleteProduct(req.params.id)
    .then(({ result }) =>
      (result.n > 0 ? res.status(200).send('Product deleted') : res.status(200).json(result)))
    .catch(() =>
      res.status(422).send({ err: { message: 'Wrong id format', code: 'invalid_data' } }));

module.exports = { listProducts, createProduct, getProduct, updateProduct, deleteProduct };

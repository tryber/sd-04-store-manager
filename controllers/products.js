const productModel = require('../model/products');

const index = async (request, response) =>
  productModel.index().then((products) => response.status(200).json({ products }));

const indexId = async (request, response) =>
  productModel
    .indexId(request.params.id)
    .then((products) => response.status(200).json(products))
    .catch(() =>
      response.status(422).send({ err: { message: 'Wrong id format', code: 'invalid_data' } }));

const create = async (request, response) => {
  const product = request.body;
  console.log('fdfdf', product);
  productModel
    .create(product)
    .then((result) => response.status(201).send(result))
    .catch(() =>
      response.status(422).send({ err: { message: 'Product already exists', code: 'invalid_data' } }));
};

const update = async (request, response) => {
  const productData = request.body;
  const { id } = request.params;

  productModel
    .update(id, productData)
    .then(() =>
      response
        .status(200)
        .json(response.json({ _id: id, name: productData.name, quantity: productData.quantity })));
};

const deleteP = async (request, response) =>
  productModel
    .deleteP(request.params.id)
    .then(({ result }) =>
      (result.n > 0 ? response.status(200).send('Product deleted') : response.status(200).json(result)))
    .catch(() =>
      response.status(422).send({ err: { message: 'Wrong id format', code: 'invalid_data' } }));

module.exports = { index, create, indexId, update, deleteP };

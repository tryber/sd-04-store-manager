const model = require('../models/commonModel');

const quantityCheck = async (req, res, next) => {
  const [sales] = req.body;
  const product = await model.findById('products', sales.productId);
  if (sales.quantity > product.quantity) {
    res.status(404).json({
      err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
    });
  }
  next();
};

const quantityUpdate = async (req, res, next) => {
  if (!req.params.id) {
    const [data] = req.body;
    const product = await model.findById('products', data.productId);
    const quantityResult = product.quantity - data.quantity;
    await model.update('products', data.productId, {
      name: product.name,
      quantity: quantityResult,
    });
  } else {
    const { id } = req.params;
    const items = req.body;
    const newQuantity = items[0].quantity;
    const sale = await model.findById('sales', id);
    const oldquantity = sale.itensSold[0].quantity;
    let quantityResult = 0;
    const { productId } = sale.itensSold[0];
    const product = await model.findById('products', productId);
    if (newQuantity > oldquantity) {
      quantityResult = product.quantity - newQuantity + oldquantity;
    } else {
      quantityResult = product.quantity + oldquantity - newQuantity;
    }
    await model.update('products', productId, { name: product.name, quantity: quantityResult });
  }
  next();
};

const quantityUpdateD = async (req, res, next) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong sale ID format' },
    });
  }
  const sale = await model.findById('sales', id);
  if (!sale) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong sale ID format' },
    });
  }
  const { productId, quantity } = sale.itensSold[0];
  const product = await model.findById('products', productId);
  const quantityResult = product.quantity + quantity;
  await model.update('products', productId, { name: product.name, quantity: quantityResult });
  next();
};

module.exports = {
  quantityCheck,
  quantityUpdate,
  quantityUpdateD,
};

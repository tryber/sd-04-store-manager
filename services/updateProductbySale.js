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

// const quantityCheck = async (req, res, next) => {
//   if (!req.params.id) {
//     const [sales] = req.body;
//     const product = await model.findById('products', sales.productId);
//     req.total = product.quantity;
//     console.log(req.total)
//     const quantityResult = product.quantity - sales.quantity;
//     await model.update('products', sales.productId, {
//       name: product.name,
//       quantity: quantityResult,
//     });
//   }
//   next();
// };

// const quantityUpdate = async (req, _, next) => {
//   if (req.params.id) {
//     const { id } = req.params;
//     const sale = await model.findById('sales', id);
//     const { productId, quantity } = sale.itensSold[0];
//     const product = await model.findById('products', productId);
//     const quantityResult = req.total - quantity;
//     console.log(req.total, quantity)
//     await model.update('products', productId, { name: product.name, quantity: quantityResult });
//   }
//   next();
// };

module.exports = {
  quantityCheck,
  // quantityUpdate,
};

const produModel = require('../models/productModel');
//  const saleModel = require('../models/salesModel');

const maxQuantity = async (req, res, next) => {
  let actProduct = 0;
  let quantSolded = 0;
  const { body } = req;
  quantSolded = body[0].quantity;
  actProduct = await produModel.getOneProductId(body[0].productId);
  if (quantSolded > actProduct.quantity) {
    return res
      .status(404)
      .json({ err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' } });
  }
  await produModel.update(actProduct.id, actProduct.name, actProduct.quantity - quantSolded);

  return next();
};

const returnQuant = () => {
  /*  let actProduct = 0;
  let quantBack = 0;

  quantBack = obj;  //  await saleModel.getOneSaleId(id);
  actProduct = await produModel.getOneProductId(id);
  console.log("back: " + quantBack + " act: " + actProduct);
  await produModel.update(
    actProduct._id,
    actProduct.name,
    actProduct.quantity + quantBack.quantity,
  );  */
};

module.exports = { maxQuantity, returnQuant };

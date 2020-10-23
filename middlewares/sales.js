// const validateQuantity = async (req, res, next) => {
//   const products = req.body;
//   const filterQuantity = products.filter(
//     (item) => item.quantity < 1 || typeof item.quantity !== 'number',
//   );
//   if (filterQuantity.length > 0) {
//     return res.status(422).json({
//       err: {
//         code: 'invalid_data',
//         message: 'Wrong product ID or invalid quantity',
//       },
//     });
//   }
//   return next();
// };

const validateQuantity = async (req, res, next) => {
  const [product] = req.body;
  if (product.quantity < 1 || typeof product.quantity !== 'number') {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  return next();
};

module.exports = { validateQuantity };

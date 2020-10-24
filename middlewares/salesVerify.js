const quantityVerify = (req, res, next) => {
  const [itensSold] = req.body;
  if (itensSold.quantity <= 0 || !Number.isInteger(itensSold.quantity)) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  next();
};

module.exports = {
  quantityVerify,
};

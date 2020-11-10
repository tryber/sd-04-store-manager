const atualizarBonus = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const insertedProduct = await models.createOne('products', { name, quantity });
    res.status(201).json(insertedProduct);
  } catch (err) {
    res.status(500).json({ err });
  }
},
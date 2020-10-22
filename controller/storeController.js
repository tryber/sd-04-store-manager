const dataStore = require('../models/dataModel');

const cadastraProduto = async (req, res) => {
  const { name, quantity } = req.body;
  console.log(name);

  if (name.length <= 5) {
    res.status(422).json({
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    });
  }
  if (quantity <= 0) {
    res.status(422).json({
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' },
    });
  }
  if (typeof quantity === 'string') {
    res.status(422).json({
      err: { code: 'invalid_data', message: '"quantity" must be a number' },
    });
  }

  const nameProd = await dataStore.findByName({ name });

  if (nameProd && nameProd.name === name) {
    res.status(422).json({
      err: { code: 'invalid_data', message: 'Product already exists' },
    });
  }

  {
    const product = await dataStore.cadastraProduto(name, quantity);
    console.log(product);

    res.status(201).json(product);
  }
};

module.exports = {
  cadastraProduto,
};

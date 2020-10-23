const {
  registerProdServ,
  listAllProdServ,
  listByIdProdServ,
} = require('../services/productsServices');

const addProdCont = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const result = await registerProdServ(name, quantity);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error addProdCont!' });
  }
};

const listAllProdCont = async (_req, res) => {
  const result = await listAllProdServ();
  try {
    return res.status(200).json({ products: result });
  } catch (error) {
    res.status(500).json({ error: 'Error listAllProdCont!' });
  }
};

const listByIdProdCont = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await listByIdProdServ(id);
    console.log(result);
    // if (!result) return res.status(422).json({ error: 'Wrong id format' });
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error listByIdProdCont!' });
  }
};

module.exports = {
  addProdCont,
  listAllProdCont,
  listByIdProdCont,
};

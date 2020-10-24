const {
  registerProdServ,
  listAllProdServ,
  listByIdProdServ,
  updateByIdProdServ,
  deleteProdServ,
} = require('../services/productsServices');

const insertProdCont = async (req, res) => {
  const { name, quantity } = req.body;

  try {
    const result = await registerProdServ(name, quantity);
    return res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error insertProdCont!' });
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
  // try {
  const result = await listByIdProdServ(id);
  if (result.err) return res.status(422).json(result);
  return res.status(200).json(result);
  // } catch (error) {
  //   res.status(500).json({ error: 'Error listByIdProdCont!' });
  // }
};

const updateByIdProdCont = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const result = await updateByIdProdServ(id, name, quantity);
    if (result.err) return res.status(422).json(result);

    return res.status(200).json({ _id: id, name, quantity });
  } catch (error) {
    res.status(500).json({ error: 'Error updateByIdProdCont!' });
  }
};

const deleteProdCont = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteProdServ(id);
    if (result.err) return res.status(422).json(result);

    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error deleteProdCont!' });
  }
};

module.exports = {
  insertProdCont,
  listAllProdCont,
  listByIdProdCont,
  updateByIdProdCont,
  deleteProdCont,
};

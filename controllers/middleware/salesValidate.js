const salesService = require('../../services/salesService');

const validaId = async (req, res, next) => {
  const { body } = req; 
  console.log("valida")
  if (!(await salesService.valida(body))) {
    return res.json({message: "Valida"})
  }

  next();

}

module.exports = {
  validaId,
}
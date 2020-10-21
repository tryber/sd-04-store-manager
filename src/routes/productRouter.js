const { Router } = require('express');
const productsController = require('../controller/productsController');

const router = Router();

router.get('/', productsController.getAllProdController);

module.exports = router;

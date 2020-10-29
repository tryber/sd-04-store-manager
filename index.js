const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const validation = require('./middlewares/salesValidations');
const service = require('./services/updateProductbySale');

const app = express();

app.use(express.json());

app.use('/products', productsController);
app.get('/sales', salesController.listAll);
app.get('/sales/:id', salesController.findById);
app.post(
  '/sales',
  service.quantityCheck,
  service.quantityUpdate,
  validation.isQuantityValid,
  salesController.add,
);
app.put('/sales/:id', validation.isQuantityValid, service.quantityUpdate, salesController.update);
app.delete('/sales/:id', service.quantityUpdateD, salesController.exclude);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('conectado');
});

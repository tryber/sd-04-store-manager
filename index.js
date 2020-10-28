const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const validation = require('./middlewares/salesValidations');

const app = express();

app.use(express.json());

app.use('/products', productsController);
app.get('/sales', salesController.listAll);
app.get('/sales/:id', salesController.findById);
app.post('/sales', validation.isQuantityValid, salesController.add);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('conectado');
});

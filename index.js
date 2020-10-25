const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const salesValidations = require('./middlewares/salesValidations');

const app = express();

app.use(express.json());

app.use('/products', productsController);
app.get('/sales', salesController.readSales);
app.get('/sales/:id', salesController.readById);
app.post('/sales', salesValidations.isQuantityValid, salesController.create);

app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('servidor ok');
});

const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();

app.use(express.json());

app.use('/products', productsController);
app.get('/sales', salesController.listSales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('conectado');
});

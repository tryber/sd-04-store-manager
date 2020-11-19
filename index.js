const express = require('express');

const app = express();
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/products', productsController);
app.use('/sales', salesController);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('Servidor rodando'));

const express = require('express');
const bodyParser = require('body-parser');
const productsController = require('./controllers/productsController');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({}));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', productsController);

app.listen(3000, () => console.log('Ouvindo a porta 3000'));

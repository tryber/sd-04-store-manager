const express = require('express');
const bodyParser = require('body-parser');

const produtoController = require('./crontrollers/produtosController');
const vendasController = require('./crontrollers/vendasController');

const app = express();

app.use(bodyParser.json()); // ou podemos usar o express.json()

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', produtoController);

app.use('/sales', vendasController);

app.listen(3000, () => {
  console.log('Ouvindo a porta 3000!');
});

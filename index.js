const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

const PORT = 3000;
const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', controllers.productsController);
app.use('/sales', controllers.salesController);

app.listen(PORT, () => console.log('Aplicação tá ON'));

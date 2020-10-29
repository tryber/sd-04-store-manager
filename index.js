const express = require('express');
const bodyParser = require('body-parser');
const routerProducts = require('./routers/routerProducts');
const routerSales = require('./routers/routerSales');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({}));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', routerProducts);

app.use('/sales', routerSales);

app.listen(3000, () => console.log('Ouvindo a porta 3000'));

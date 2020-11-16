const express = require('express');
const bodyParser = require('body-parser');
const Controller = require('./controller');

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/products', Controller.productController);
app.use('/sales', Controller.salesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('APP ONLINE 3000!');
});

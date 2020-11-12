const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('./controllers');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/products', controllers.productsController);
// app.use('/sales', controllers.salesController);

app.listen(port, () => console.log(`Listening on ${port}`));

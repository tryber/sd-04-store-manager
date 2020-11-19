const express = require('express');
const app = express ();
const bodyParser = require('body-parser');
const produController = require('./controllers/productController');
const port = 3000;

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.send();
});

app.use('/products', produController);

app.listen(port, () => console.log(`Port 3000 on Call`));

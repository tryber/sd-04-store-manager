const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/** Routes */
const routes = require('./routes');

/** Evalutor Function */
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', routes.productsRoutes);

app.listen(3000, () => console.log('Example app listening on port port!'));

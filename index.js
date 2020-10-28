const express = require('express');

const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/products', productsController);

app.use('/sales', salesController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send('Hello World');
});

app.listen(port, () => console.log(`App listening on port  ${port}`));

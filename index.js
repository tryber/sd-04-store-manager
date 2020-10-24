const express = require('express');
const productscontroller = require('./controllers/productscontroller');
const salescontroller = require('./controllers/salesController');

const app = express();

app.use(express.json());
app.use('/products', productscontroller);
app.use('/sales', salescontroller);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

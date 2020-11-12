const express = require('express');
const productsController = require('./controllers/productsController');
const salesController = require('./controllers/salesController');

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (request, response) => {
  response.send();
});

app.use('/products', productsController);
app.use('/sales', salesController);


app.listen(PORT, () => console.log(`Iniciado na porta ${PORT}`));

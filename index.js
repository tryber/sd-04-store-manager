const express = require('express');
const productsController = require('./controllers/productsController');

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (request, response) => {
  response.send();
});

app.use('/products', productsController);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}`));

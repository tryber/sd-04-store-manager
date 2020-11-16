const express = require('express');

const app = express();
const controllers = require('./controllers');

const PORT = 3000;
app.use(express.json());
app.use('/products', controllers.productsController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(PORT, () => console.log(`Listen on ${PORT}`));

const express = require('express');
const { productsRouter } = require('./controllers');

const PORT = 3000;
const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());

app.use('/products', productsRouter);

app.listen(PORT, () => console.log(`Listening PORT ${PORT}`));

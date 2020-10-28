require('dotenv').config();

const express = require('express');
const productsRouter = require('./controllers/productsRouter');
const salesRouter = require('./controllers/salesRouter');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

app.listen(PORT, () => console.log(`Listening PORT ${PORT}`));

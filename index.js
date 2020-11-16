const express = require('express');
const productsController = require('./controllers/productsController');
// const salesController = require('./controllers/salesController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/products', productsController);
// app.use('/sales', salesController);

app.listen(PORT, () => console.log(`Listening on port! ${PORT}`))

// não remova esse endpoint, e para o savaliador funcionar
app.get('/', (request, response) => {
    response.send();
});

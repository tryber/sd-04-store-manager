const express = require('express');
const app = express();
const port = 3000;
const productsController = require('./controllers/productsController');

app.use(express.json());
app.use('/products', productsController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
app.listen(port, () => console.log('Listening on port ' + port));

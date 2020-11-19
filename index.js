const express = require('express');
const { products, sales } = require('./controller');

const app = express();

app.use(express.json());
app.use('/products', products);
app.use('/sales', sales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}`));

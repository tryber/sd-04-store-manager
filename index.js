const express = require('express');
const { products, sales } = require('./controllers');

const app = express();

const PORT = 3000;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => response.send());

app.use('/product/* , sales */ s', products);
app.use('/sales', sales);

app.listen(PORT, console.log(`listening at http://localhost:${PORT}`));

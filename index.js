const express = require('express');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const port = 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
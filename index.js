const express = require('express');
const app = express();

const PORT = 3000 || process.env;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

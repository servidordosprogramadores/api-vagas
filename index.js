const express = require('express');
const routes = require('./src/routes');

const app = express();

app.use(express.json());
app.use(routes);

const PORT = 80;

app.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`);
  console.log(`Rotas disponíveis: /estagio, /junior, /pleno, /senior`);
});

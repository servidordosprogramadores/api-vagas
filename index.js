const express = require('express');
const routes = require('./src/routes');

const app = express();

app.use(express.json());
app.use(routes);

const PORT = 80;

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta http://localhost:${PORT}/latest`);
});

const express = require('express');
const JobController = require('./controllers/JobController');

const routes = express.Router();

routes.get('/', (req, res) => {
  return res.json({
    rotas_disponiveis: ['/estagio', '/pleno', '/senior'],
    repositorio: 'https://github.com/matheusaudibert/jobs-api'
  });
});

routes.get('/estagio', JobController.getEstagio);
routes.get('/pleno', JobController.getPleno);
routes.get('/senior', JobController.getSenior);

module.exports = routes;